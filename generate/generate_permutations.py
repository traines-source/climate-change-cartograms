import json
import math
import random
import imageio as iio
import numpy as np
import numpy.ma as ma
import cv2
import imageio as iio
import os

TARGET_RESOLUTION=(400,200)
PRESENTATION_RESOLUTION=(200,100)

def read_json(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def write_png(filename, im):
    iio.imwrite(filename, np.rint(im*255).astype(np.uint8))

def write_dat(filename, im):
    matrix = "\n".join([" ".join([str(round(cell, 3)) for cell in row]) for row in im])
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

def create_permutation(mappings, binaries, mask_avg):
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
    result *= 1.0/result.max() 
    masked = ma.masked_array(result, mask)
    if mask_avg is None:
        mask_avg = masked.mean()
    filled_result = masked.filled(mask_avg)
    filename = permutation_str(binaries)
    filename_densities = "working/densities.dat"
    filename_distorted = "working/distorted.dat"
    write_dat(filename_densities, filled_result)
    write_png("working/"+filename+".png", filled_result)        

    os.system("cart {} {} {} {}".format(TARGET_RESOLUTION[0], TARGET_RESOLUTION[1], filename_densities, filename_distorted))
    distorted = read_lines(filename_distorted)
    ratio = TARGET_RESOLUTION[0]/PRESENTATION_RESOLUTION[0]
    if not ratio.is_integer():
        raise Exception("Target-Presentation ratio must be integer")
    #matrix = np.reshape(distorted, (TARGET_RESOLUTION[0]+1, TARGET_RESOLUTION[1]+1))
    #scaled = [matrix[i][j] for i in range(0, len(matrix), int(ratio)) for j in range(0, len(matrix[i]), int(ratio))]
    #output = np.array(scaled).flatten()
    output = distorted
    
    write_lines("working/"+filename+".csv", output)

    return mask_avg


def create_permutations(mappings):
    mask_avg = None
    binaries = []
    binaries.extend(mappings["year"]["mapping"])
    binaries.extend(mappings["parameters"]["mapping"])
    binaries.extend(mappings["metrics"]["mapping"])
    binaries.extend(mappings["impacts"]["mapping"])        

    permutation_count = 2**len(binaries)
    useful_permutations = 0
    for i in range(permutation_count):
        for j in range(len(binaries)):
            if i&(2**j) != 0:
                binaries[j]["enabled"] = True
            else:
                binaries[j]["enabled"] = False
        
        skip_permutation = False
        today_mode = not mappings["year"]["mapping"][0]["enabled"]
        any_impact = max(map(lambda impact: impact["enabled"], mappings["impacts"]["mapping"]))
        any_parameters = max(map(lambda param: param["enabled"], mappings["parameters"]["mapping"]))

        if today_mode and not any_parameters:
            mask_avg = None
            print("Reset mask avg", permutation_str(binaries))

        if any_parameters and (today_mode or not any_impact):
            skip_permutation = True
        #if not today_mode:
        #    skip_permutation = True
        
        if not skip_permutation:
            mask_avg = create_permutation(mappings, binaries, mask_avg)
            useful_permutations += 1
        else:
            print("Skipping", permutation_str(binaries))
    
    print("Permutations", useful_permutations, "/", permutation_count)

mappings = read_json("working/mappings.json")

print("Import densities...")
import_densities(mappings, "metrics")
import_densities(mappings, "impacts")
mask = np.logical_not(resized_image("population/out/mask.tiff").astype(dtype=bool))
write_png("working/mask.png", mask)

print("Create permutations...")
create_permutations(mappings)


