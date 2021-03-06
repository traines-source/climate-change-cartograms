import math
import random
import imageio as iio
import numpy as np
import numpy.ma as ma
import cv2
import imageio as iio
import os
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon
from shapely.ops import nearest_points
import sys
sys.path.append('../')
import utils

TARGET_RESOLUTION=(600,300)
thresh_dist = (TARGET_RESOLUTION[0]/64)**2
thresh_area = TARGET_RESOLUTION[0]/100
standard_display_resolution=1920
standard_triangle_area = ((8192/standard_display_resolution)**2)/2

hires_triangles={}

def write_png(filename, im):
    iio.imwrite(filename, np.rint(im*255).astype(np.uint8))

def write_dat(filename, im):
    matrix = "\n".join([" ".join([str(cell) for cell in row]) for row in im])
    with open(filename, "w") as f:
        f.write(matrix)

def read_lines(filename):
    with open(filename, "r") as f:
        rows = f.readlines()
        return rows

def write_lines(filename, lines):
    with open(filename, "w") as f:
        f.write("".join(lines))

def interpolate_mapping(mapping, x):
    upper = None
    lower = None
    for i in range(len(mapping)):
        if mapping[i]["x"] >= x and (upper is None or mapping[i]["x"] < upper["x"]):
            upper = mapping[i]
        if mapping[i]["x"] <= x and (lower is None or mapping[i]["x"] > lower["x"]):
            lower = mapping[i]
    if upper == lower:
        return (upper, upper, 0)
    if lower is None:
        return (upper, upper, 0)
    if upper is None:
        return (upper, upper, 0)
    return (upper, lower, (x-lower["x"])/(upper["x"]-lower["x"]))

def interpolate_density(i, gap, scenarios, value):
    print("interpolate", value["id"]+"_"+scenarios[i-gap]["id"])
    ratio = (scenarios[i-gap]["y"]-scenarios[i]["y"])/(scenarios[i-gap-1]["y"]-scenarios[i]["y"])
    value["data"][scenarios[i-gap]["id"]] = value["data"][scenarios[i-gap-1]["id"]]*ratio + value["data"][scenarios[i]["id"]]*(1-ratio)
    filename = "working/"+value["id"]+"_"+scenarios[i-gap]["id"]+"_interpolation.png"
    write_png(filename, value["data"][scenarios[i-gap]["id"]])

def resized_image(path):    
    img = iio.imread(path)
    if img is None or img.size == 0:
        raise FileNotFoundError()
    w = TARGET_RESOLUTION[0]
    h = int(w/float(img.shape[1])*img.shape[0])
    return cv2.resize(img, (w, h))[:TARGET_RESOLUTION[1], :TARGET_RESOLUTION[0]]

def import_densities(mappings, key):
    for value in mappings[key]["mapping"]:
        interpolate_last = 0
        scenarios = mappings[key+"_scenarios"]["mapping"]
        value["data"] = {}
        for i, scenario in enumerate(scenarios):
            try:
                value["data"][scenario["id"]] = resized_image(value["id"]+"/out/"+value["id"]+"_"+scenario["id"]+".tiff")
                print(value["id"], scenario["id"])
                if interpolate_last != 0:
                    if i-interpolate_last <= 0:
                        raise Exception("Cannot interpolate first")
                    
                    for gap in range(interpolate_last, 0, -1):
                        print(gap)
                        interpolate_density(i, gap, scenarios, value)
                    interpolate_last = 0
            except FileNotFoundError:
                interpolate_last += 1

        if interpolate_last:
            raise Exception("Cannot interpolate last: " + value["id"]+"/out/"+value["id"]+"_"+scenarios[i-1]["id"]+".tiff")

def permutation_str(binaries):
    return "_".join([b["id"]+"-"+str(int(b["enabled"])) for b in binaries])

def cumulate_co2_emissions(mappings):
    cumul_co2 = mappings["year"]["mapping"][0]["y"]
    params = mappings["parameters"]["mapping"]
    for param in params:
        if param["enabled"]:
            cumul_co2 += param["y"]
    return cumul_co2

def create_permutation(mappings, binaries):
    print(permutation_str(binaries))
    year2100 = mappings["year"]["mapping"][0]["enabled"]
    emissions = cumulate_co2_emissions(mappings) if year2100 else 0
    print('Cumulated CO2 emissions:', emissions)
    upper, lower, ratio = interpolate_mapping(mappings["impacts_scenarios"]["mapping"], emissions);
    print('Temperature forecast:', ratio*(upper["y"]-lower["y"])+lower["y"])

    metrics_product = np.ones((TARGET_RESOLUTION[1], TARGET_RESOLUTION[0]))
    for metric in mappings["metrics"]["mapping"]:
        if not metric["enabled"]:
            continue
        interpolation = metric["data"]["2100" if year2100 else "baseline"]
        metrics_product *= interpolation
    
    impacts_sum = np.zeros((TARGET_RESOLUTION[1], TARGET_RESOLUTION[0]))
    for impact in mappings["impacts"]["mapping"]:
        if not impact["enabled"]:
            continue
        interpolation = impact["data"]["baseline"]
        if year2100:
            interpolation = impact["data"][upper["id"]]*ratio + impact["data"][lower["id"]]*(1-ratio)
        impacts_sum += interpolation

    result = metrics_product
    if impacts_sum.max() > 0:
        result *= impacts_sum

    print(metrics_product.max(), impacts_sum.max(), result.max())

    filename = permutation_str(binaries)
    
    return {"filename": filename, "data": result}

def index(p):
    return p[1]*(TARGET_RESOLUTION[0]+1)+p[0]

def delta(a, b):
    return (a[0]-b[0], a[1]-b[1])

def avg(a, b):
    return ((a[0]+b[0])/2, (a[1]+b[1])/2)

def add(a, b):
    return (a[0]+b[0], a[1]+b[1])

def normal(a, b):
    return a[0]*b[1]-a[1]*b[0]

def triangle_orientation(a, b, c):
    return normal(delta(b, a), delta(c, a))

def sdist(a, b):
    return (a[0]-b[0])**2+(a[1]-b[1])**2

def fix_anomalies(pts):
    oob = 0
    for y in range(1, TARGET_RESOLUTION[1]):
        for x in range(1, TARGET_RESOLUTION[0]):
            p = pts[index((x, y))]
            p1 = pts[index((x-1, y))]
            p2 = pts[index((x, y-1))]
            if sdist(p, p1) > thresh_dist or sdist(p, p2) > thresh_dist:
                triangles = [((x+1, y-1), (x, y-1)), ((x+1, y), (x+1, y-1)), ((x, y+1), (x+1, y)), ((x-1, y+1), (x, y+1)), ((x-1, y), (x-1, y+1)), ((x, y-1), (x-1, y))]
                misoriented_area_before = 0
                misoriented_area_after = 0
                correct_area_before = 0
                correct_area_after = 0
                new_p = add((x,y), avg(delta(p1, (x-1, y)), delta(p2, (x, y-1))))
                for triangle in triangles:
                    oriented_area_before = triangle_orientation(p, pts[index(triangle[0])], pts[index(triangle[1])])
                    if abs(oriented_area_before) > thresh_area:                    
                        correct_area_before += abs(min(0, oriented_area_before))
                        misoriented_area_before += max(0, oriented_area_before)
                    oriented_area_after = triangle_orientation(new_p, pts[index(triangle[0])], pts[index(triangle[1])])
                    if abs(oriented_area_after) > thresh_area:
                        correct_area_after += abs(min(0, oriented_area_after))
                        misoriented_area_after += max(0, oriented_area_after) 
                if misoriented_area_after < misoriented_area_before and correct_area_after < correct_area_before:                    
                    oob += 1
                    pts[index((x, y))] = new_p
    return oob

def update_hires_triangle(coords, triangle_index, pts):
    distorted_coords = [pts[index(p)] for p in coords]
    area = abs(triangle_orientation(distorted_coords[0], distorted_coords[1], distorted_coords[2]))
    if area > standard_triangle_area and (triangle_index not in hires_triangles or area > hires_triangles[triangle_index]['area']):
        hires_triangles[triangle_index] = {
            'coords': coords,
            'area': area,
            'index': triangle_index
        }

def update_hires_triangles(pts):
    for y in range(0, TARGET_RESOLUTION[1]):
        for x in range(0, TARGET_RESOLUTION[0]):
            triangle_index = (y*TARGET_RESOLUTION[0]+x)*2
            update_hires_triangle(((x,   y),  (x,   y+1),(x+1, y  )), triangle_index, pts)
            update_hires_triangle(((x+1, y+1),(x+1, y),  (x,   y+1)), triangle_index+1, pts)

def output_hires_triangles():
    utils.write_json('map/working/hires_triangles.json', list(hires_triangles.values()))

def write_permutation(filled_result, filename):    
    filename_densities = "working/"+filename+".densities"
    filename_distorted = "working/"+filename+".distorted"
    write_dat(filename_densities, filled_result)
    write_png("working/"+filename+".png", filled_result)        

    os.system("cart {} {} {} {}".format(TARGET_RESOLUTION[0], TARGET_RESOLUTION[1], filename_densities, filename_distorted))
    distorted = read_lines(filename_distorted)    
    pts = [[float(axis) for axis in entry.split(" ")] for entry in distorted]
            
    oob = fix_anomalies(pts)
    oob += fix_anomalies(pts)
    print(oob, "points out of bounds")

    update_hires_triangles(pts)
    
    output = [" ".join([str(round(axis, 1)) for axis in entry])+"\n" for entry in pts]
    write_lines("working/"+filename+".csv", output)

def resolve_buffer(buffer):
    if len(buffer) == 0:
        return
    perm_max = 0.0
    perm_mean = 0
    for entry in buffer:            
        entry["data"] = ma.masked_array(entry["data"], mask)
        perm_mean += entry["data"].mean() #baseline
        new_max = entry["data"].max()
        if new_max > perm_max:
            perm_max = new_max
    perm_mean *= 1.0/perm_max/len(buffer)
    print("Combo max and mean:", perm_max, perm_mean)
    for entry in buffer:
        entry["data"] *= 1.0/perm_max
        entry["data"] = entry["data"].filled(perm_mean)
        print("Filled max and mean:", entry["data"].max(), entry["data"].mean(), entry["filename"])
        write_permutation(entry["data"], entry["filename"])

def create_permutations(mappings):
    binaries = []
    binaries.extend(mappings["year"]["mapping"])
    binaries.extend(mappings["parameters"]["mapping"])
    binaries.extend(mappings["metrics"]["mapping"])
    binaries.extend(mappings["impacts"]["mapping"])        

    permutation_count = 2**len(binaries)
    useful_permutations = 0
    buffer = []
    for i in range(permutation_count):
        for j in range(len(binaries)):
            if i&(2**j) != 0:
                binaries[j]["enabled"] = True
            else:
                binaries[j]["enabled"] = False
        
        skip_permutation = False
        today_mode = not mappings["year"]["mapping"][0]["enabled"]
        any_impact = max(map(lambda impact: impact["enabled"], mappings["impacts"]["mapping"]))
        multiple_impacts = sum(map(lambda impact: impact["enabled"], mappings["impacts"]["mapping"])) > 1
        any_parameters = max(map(lambda param: param["enabled"], mappings["parameters"]["mapping"]))

        if today_mode and not any_parameters:
            resolve_buffer(buffer)
            buffer = []
            print("Buffer cleared, new metrics/impacts combo, permutations so far:", useful_permutations)

        if any_parameters and (today_mode or not any_impact):
            skip_permutation = True
        if multiple_impacts:
            skip_permutation = True
        #if not today_mode:
        #    skip_permutation = True
        #perm = 0b010100000 #reverse
        #if int(perm) != i:
        #    skip_permutation = True
        #if any_parameters:
        #    skip_permutation = True
        
        if not skip_permutation:
            buffer.append(create_permutation(mappings, binaries))
            useful_permutations += 1
        #else:
        #    print("Skipping", permutation_str(binaries))
    
    resolve_buffer(buffer)
    buffer = []
    print("Permutations", useful_permutations, "/", permutation_count)

mappings = utils.read_json("emissions/mappings.json")

print("Import densities...")
import_densities(mappings, "metrics")
import_densities(mappings, "impacts")
mask = np.logical_not(resized_image("population/out/mask.tiff").astype(dtype=bool))
write_png("working/mask.png", mask)

print("Create permutations...")
create_permutations(mappings)

output_hires_triangles()