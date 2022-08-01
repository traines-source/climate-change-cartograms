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

hobo = utils.HoboDyerProj(1200)

MAX_DIST_LEGEND = 20
MAX_DIST_GEO = 3
WHITE_THRESHOLD = 10
FREQ_ONLY = True

def colorscale_legend(source, lower, upper):
    im = iio.imread(source)
    height = im.shape[0]
    return [{"color": im[i][0].tolist(), "value": round(upper-(upper-lower)*i/(height-1), 2)} for i in range(height)]


legend_burnability = colorscale_legend("working/colorscale_legend_burnability.png", 0, 1)


def color_dist(color1, color2):
    return math.sqrt(sum([pow(color1[i]-color2[i], 2) for i in range(3)]))

def greyscale(color):
    grey_value = color[0]
    for i in range(1,3):
        if grey_value != color[i] and color_dist(color, (255,255,255)) > WHITE_THRESHOLD:
            return False
    return True

def min_dist_to_legend(legend, pixel):
    min_result = legend[0]
    min_dist = color_dist(legend[0]["color"], pixel)
    for i in range(1, len(legend)):
        new_color_dist = color_dist(legend[i]["color"], pixel)
        if new_color_dist < min_dist:
            min_dist = new_color_dist
            min_result = legend[i]
    return (min_dist, min_result["value"])

class EquirectangularProjection:
    RADIUS_GLOBE = 272.7
    STANDARD_PARALLEL = 0
    CENTRAL_PARALLEL = 0
    CENTRAL_MERIDIAN = 0
    DX = 860
    DY = 402.4
    #SCALE = 547619403
    SCALE = 1

    def lon(self, equirect_x):
        return ((equirect_x-self.DX)/self.RADIUS_GLOBE/math.cos(self.STANDARD_PARALLEL)+self.CENTRAL_MERIDIAN)*self.SCALE

    def lat(self, equirect_y):
        return -((equirect_y-self.DY)/self.RADIUS_GLOBE+self.CENTRAL_PARALLEL)*self.SCALE

    def x(self, lon):
        return self.RADIUS_GLOBE*(lon/self.SCALE-self.CENTRAL_MERIDIAN)*math.cos(self.STANDARD_PARALLEL)+self.DX
    
    def y(self, lat):
        return self.RADIUS_GLOBE*(-lat/self.SCALE-self.CENTRAL_PARALLEL)+self.DY

equirect = EquirectangularProjection()

def to_degrees(radians):
    return round(radians/math.pi*180, 3)

def to_radians(degrees):
    return round(degrees*math.pi/180, 3)

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
    if greyscale(pixel):
        return False
    min_dist, value = min_dist_to_legend(legend, pixel)
    if min_dist < MAX_DIST_LEGEND:
        return (to_degrees(equirect.lon(x)), to_degrees(equirect.lat(y)), value)
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
        for x in range(width):
            i+=1
            sample = value_at(im, x, y, legend)
            if sample != False and i%1 == 0:
                coords.append(sample[0:2])
                values.append(sample[2])
    
    print(len(values))
    utils.write_json(mapfile + ".cache.json", (coords, values))
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
        x = int(round(equirect.x(to_radians(lonlat[0])), 0))
        y = int(round(equirect.y(to_radians(lonlat[1])), 0))
        if x >= width or y >= height or x < 0 or y < 0:
            values.append(-1)
        elif greyscale(im[y][x]):
            values.append(-1)
        else:
            values.append(1)
        coords.append(lonlat)

    return coords, values

def euclidian_dist(a, b):
    return math.sqrt((a[0]-b[0])**2+(a[1]-b[1])**2)

def reduce_to_nearest(samples, samples_data, coords, values, value_field):
    print("Geo index...", len(coords))
    s = geopandas.GeoSeries(map(Point, coords)).sindex
    print("Reducing to nearest...")
    not_found_ctr = 0
    for j in range(len(samples)):
        if samples_data[j] is None:
            continue
        min_coords_i = s.nearest(Point(samples[j]))[1][0]
        min_dist = euclidian_dist(samples[j], coords[min_coords_i])
        if min_dist > MAX_DIST_GEO:
            not_found_ctr += 1
            samples_data[j] = None
        else:
            samples_data[j][value_field] = values[min_coords_i]
            
    print("No value for n of m samples:", not_found_ctr, len(samples))
    return (samples, samples_data)

datasources = [
    ("burnability.png", legend_burnability, "baseline")
]

def digitize(from_cache=False):
    print("Reading maps...")
    samples, values = sample_equalarea("working/burnability.png", legend_burnability)
    samples_data = [{} if values[i] != -1 else None for i in range(len(samples))]

    for source in datasources:
        print("===", source[0])
        coords = []
        values = []
        if not from_cache:
            coords, values = digitize_map("working/"+source[0], source[1])
        else:
            coords, values = utils.read_json("working/"+source[0]+".cache.json")

        samples, samples_data = reduce_to_nearest(samples, samples_data, coords, values, source[2])

    print("Writing geojson...")
    geojson = to_geojson(samples, samples_data)
    utils.write_json("working/burnability.geojson", geojson)



def wf_abs_attribute(props, scenario, attribute):
    if props is None or "baseline" not in props:
        return 0
    value = props["baseline"]
    return max(0, value)

def append_and_maximize(sample, summaries, max_value, scenario, attribute):
    attribute_value = wf_abs_attribute(sample, scenario, attribute)
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
    dataset = driver.Create("out/wf_burnability_"+scenario+".tiff",p.width, p.height, 1, gdal.GDT_Float32 )
    dataset.GetRasterBand(1).WriteArray(np.array(rows))
    print(np.array(rows))
    tl = p.unscaled_transform((-180, 90))
    geo = (tl[0], -tl[0]*2/p.width, 0, tl[1], 0, -tl[1]*2/p.height)
    dataset.SetGeoTransform(geo)
    print(geo)
    srs = osr.SpatialReference()
    srs.ImportFromProj4(utils.HoboDyerProj.proj4)
    dataset.SetProjection(srs.ExportToWkt())
    dataset.FlushCache()
    dataset = None

    im = iio.imread("out/wf_burnability_"+scenario+".tiff")
    iio.imwrite("out/wf_burnability_"+scenario+".png", np.rint(im*255).astype(np.uint8))

def write_tiffs():
    samples_data = utils.read_json("working/burnability.geojson")    
    samples = [sample["properties"] for sample in samples_data["features"]]

    scenarios = [
        "baseline"
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


digitize()
write_tiffs()