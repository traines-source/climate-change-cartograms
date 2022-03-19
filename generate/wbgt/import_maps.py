import json
import math
import random
import geopandas
from shapely.geometry import Point
from osgeo import gdal
from osgeo import osr
import imageio as iio
import numpy as np
import sys
sys.path.append('../')
import utils

MAX_DIST_LEGEND = 400
MAX_DIST_GEO = 9
WHITE_THRESHOLD = 100

hammer = utils.HammerProj()
hobo = utils.HoboDyerProj(400)

def read_json(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def write_json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f)

def inverse_color(data):
    for entry in data:
        c = entry["color"]
        entry["color"] = [c[2], c[1], c[0]]
    return data

def colorscale_legend(source, lower, upper):
    im = iio.imread(source)
    height = im.shape[0]
    return [{"color": im[i][0].tolist(), "value": round(upper-(upper-lower)*i/(height-1), 2)} for i in range(height)]


legend = colorscale_legend("working/legend.png", 0, 35)

def color_dist(color1, color2):
    return (color1[0]-color2[0])**2+(color1[1]-color2[1])**2+(color1[2]-color2[2])**2

def greyscale(color):
    grey_value = color[0]
    for i in range(1,3):
        if grey_value != color[i] and color_dist(color, (255,255,255)) > WHITE_THRESHOLD:
            return False
    return True

def to_hashable(pixel):
    return (pixel[0], pixel[1], pixel[2])

legend_cache = {}
def min_dist_to_legend(legend, pixel):
    h = to_hashable(pixel)
    if h in legend_cache:
        return legend_cache[h]
    min_result = legend[0]
    min_dist = color_dist(legend[0]["color"], pixel)
    for i in range(1, len(legend)):
        new_color_dist = color_dist(legend[i]["color"], pixel)
        if new_color_dist < min_dist:
            min_dist = new_color_dist
            min_result = legend[i]
    result = (min_dist, min_result["value"])
    legend_cache[h] = result
    return result

def to_geojson(coords, values):
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [coords[i][0], coords[i][1]]
                },
                "properties": values[i]
            } for i in range(len(coords))
        ]
    }


def value_at(im, x, y, legend):
    pixel = im[y][x]
    lonlat = hammer.reverse_transform((x, y))
    if lonlat[0] != lonlat[0] or lonlat[1] != lonlat[1]:
        return False
    if greyscale(pixel):
        return False
    min_dist, value = min_dist_to_legend(legend, pixel)
    if min_dist < MAX_DIST_LEGEND:
        return (lonlat[0], lonlat[1], value)
    return False

def digitize_map(mapfile, legend):
    im = iio.imread(mapfile)
    height = im.shape[0]
    width = im.shape[1]

    coords = []
    values = []

    print("Analyzing map...")

    i = 0
    for y in range(height):
        print(y)
        for x in range(width):
            i+=1
            sample = value_at(im, x, y, legend)
            if sample != False and i%1 == 0:
                coords.append(sample[0:2])
                values.append(sample[2])
    
    print(len(values))
    write_json(mapfile + ".cache.json", (coords, values))
    return (coords, values)


def sample_equalarea(mapfile, legend):
    im = iio.imread(mapfile)
    height = im.shape[0]
    width = im.shape[1]

    coords = []
    values = []

    print("Sampling map...")

    p = iter(hobo)

    for lonlat in p:
        xy = hammer.transform(lonlat)
        x = int(round(xy[0], 0))
        y = int(round(xy[1], 0))
        if x >= width or y >= height or x < 0 or y < 0:
            values.append(-1)
        elif greyscale(im[y][x]):
            values.append(-1)
        else:
            values.append(1)
        coords.append(lonlat)

    return coords, values

def squared_dist(a, b):
    return (a[0]-b[0])**2+(a[1]-b[1])**2


def reduce_to_nearest(samples, samples_data, coords, values, value_field):
    print("Geo index...", len(coords))
    s = geopandas.GeoSeries(map(Point, coords)).sindex
    print("Reducing to nearest...")
    not_found_ctr = 0
    for j in range(len(samples)):
        if samples_data[j] is None:
            continue
        min_coords_i = s.nearest(Point(samples[j]))[1][0]
        min_dist = squared_dist(samples[j], coords[min_coords_i])
        #min_dist = squared_dist(samples[j], coords[0])
        #min_coords_i = 0
        #for i in range(len(coords)):
        #    sd = squared_dist(samples[j], coords[i])
        #    if sd < min_dist:
        #        min_dist = sd
        #        min_coords_i = i
        if min_dist > MAX_DIST_GEO:
            not_found_ctr += 1
            samples_data[j] = None
        else:
            samples_data[j][value_field] = values[min_coords_i]
            
    print("No value for n of m samples:", not_found_ctr, len(samples))
    return (samples, samples_data)

datasources = [
    ("baseline.png", legend, "baseline"),
    ("rcp26.png", legend, "rcp26"),
    ("rcp45.png", legend, "rcp45"),
    ("rcp60.png", legend, "rcp60"),
    ("rcp85.png", legend, "rcp85"),
]

def digitize(from_cache=True):
    print("Reading maps...")
    samples, values = sample_equalarea("working/rcp85.png", legend)
    samples_data = [{} if values[i] != -1 else None for i in range(len(samples))]

    for source in datasources:
        print("===", source[0])
        coords = []
        values = []
        if not from_cache:
            coords, values = digitize_map("working/"+source[0], source[1])
        else:
            coords, values = read_json("working/"+source[0]+".cache.json")

        samples, samples_data = reduce_to_nearest(samples, samples_data, coords, values, source[2])

    print("Writing geojson...")
    geojson = to_geojson(samples, samples_data)
    write_json("wbgt.geojson", geojson)

def abs_attribute(props, scenario):
    if props is None or "baseline" not in props:
        return 0
    value = props[scenario]
    return max(0, value)

def append_and_maximize(sample, summaries, max_value, scenario, attribute):
    attribute_value = abs_attribute(sample, scenario)
    summaries[scenario][attribute].append(attribute_value)
    if attribute_value > max_value[attribute]:
        max_value[attribute] = attribute_value
    
def write_tiff(arr, scenario):
    p = hobo
    print("min:", min(arr), "max:", max(arr))
    rows = []
    for i in range(len(arr)):
        if i%p.width == 0:
            rows.append([])
        rows[-1].append(arr[i])

    driver = gdal.GetDriverByName('GTiff')
    dataset = driver.Create("out/wbgt_"+scenario+".tiff",p.width, p.height, 1, gdal.GDT_Float32 )
    dataset.GetRasterBand(1).WriteArray(np.array(rows))

    tl = p.unscaled_transform((-180, 90))
    geo = (tl[0], -tl[0]*2/p.width, 0, tl[1], 0, -tl[1]*2/p.height)
    dataset.SetGeoTransform(geo)
    print(geo)
    srs = osr.SpatialReference()
    srs.ImportFromProj4(utils.HoboDyerProj.proj4)
    dataset.SetProjection(srs.ExportToWkt())
    dataset.FlushCache()
    dataset = None

    im = iio.imread("out/wbgt_"+scenario+".tiff")
    iio.imwrite("out/wbgt_"+scenario+".png", np.rint(im*255).astype(np.uint8))

def write_tiffs():
    samples_data = read_json("wbgt.geojson")    
    samples = [sample["properties"] for sample in samples_data["features"]]

    scenarios = [
        "baseline",
        "rcp26",
        "rcp45",
        "rcp85",
    ]
    summaries = {}

    for scenario in scenarios:
        summaries[scenario] = {"total":[]}
    max_value = {"total":0}

    for sample in samples:
        for scenario in scenarios:
            append_and_maximize(sample, summaries, max_value, scenario, "total")
    
    for scenario in scenarios:
        for i in range(len(summaries[scenario]["total"])):
            summaries[scenario]["total"][i] /= max_value["total"]
        write_tiff(summaries[scenario]["total"], scenario)


digitize(False)
print(hammer.reverse_transform((761,383)))
print(0,0, hammer.unscaled_transform((0, 0)))
print(180,0, hammer.unscaled_transform((180, 0)))
print(0,90, hammer.unscaled_transform((0, 90)))
print(0, -90, hammer.unscaled_transform((0, -90)))
print(-180,0, hammer.unscaled_transform((-180, 0)))
print("scaled")
print(0,0, hammer.transform((0, 0)))
print(180,0,hammer.transform((180, 0)))
print(-180,0,hammer.transform((-180, 0)))
print(0,-90,hammer.transform((0, -90)))
write_tiffs()