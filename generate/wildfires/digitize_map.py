import cv2
import json
import math
import random
from scipy.spatial.distance import cdist
import utils

MAX_DIST_LEGEND = 20
MAX_DIST_GEO = 3
WHITE_THRESHOLD = 10
SAMPLE_COUNT = 10000

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
    im = cv2.imread(source)
    height = im.shape[0]
    return [{"color": im[i][0].tolist(), "value": round(upper-(upper-lower)*i/(height-1), 2)} for i in range(height)]


legend_frequency = colorscale_legend("working/colorscale_legend_changes.png", -0.1, 0.1)
legend_season_length = colorscale_legend("working/colorscale_legend_changes.png", -50, 50)
legend_ecoregions = inverse_color(read_json("working/ecoregions_baseline.json"))


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
    RADIUS_GLOBE = 137.7
    STANDARD_PARALLEL = 0.819
    CENTRAL_PARALLEL = 0
    CENTRAL_MERIDIAN = 0
    DX = 294.0
    DY = 216.4
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


class LambertCylindricalEqualareaProjection:
    CENTRAL_MERIDIAN = 0
    DX = 0.5
    DY = 0.5
    SCALE = 2*math.pi

    def lon(self, x):
       return (x-self.DX+self.CENTRAL_MERIDIAN)*self.SCALE

    def lat(self, y):
        return -math.asin(y-self.DY)*self.SCALE

    def x(self, lon):
        return lon/self.SCALE-self.CENTRAL_MERIDIAN+self.DX
    
    def y(self, lat):
        return math.sin(-lat/self.SCALE)+self.DY

equalarea = LambertCylindricalEqualareaProjection()
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
    im = cv2.imread(mapfile)
    height = im.shape[0]
    width = im.shape[1]

    coords = []
    values = []

    print("Analyzing map...")

    i = 0
    for y in range(height):
        #print("Row", y)
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
    im = cv2.imread(mapfile)
    height = im.shape[0]
    width = im.shape[1]

    coords = []
    values = []

    print("Sampling map...")

    p = iter(utils.HoboDyerProj())

    for lonlat in p:
        #print(lonlat)
        x = int(round(equirect.x(to_radians(lonlat[0])), 0))
        y = int(round(equirect.y(to_radians(lonlat[1])), 0))
        if x >= width or y >= height or x < 0 or y < 0:
            values.append(-1)
        elif greyscale(im[y][x]):
            values.append(-1)
        else:
            values.append(1)
        coords.append(lonlat)

    print("cc", len(coords), len(values), sum(values))
    return coords, values


def reduce_to_nearest(samples, samples_data, coords, values, value_field):
    print("Cdist...")
    distances = cdist(samples, coords)
    print("Reducing to nearest...")
    not_found_ctr = 0
    for j in range(len(distances)):
        if samples_data[j] is None:
            continue
        min_dist = distances[j][0]
        min_coords_i = 0
        for i in range(len(distances[j])):
            if distances[j][i] < min_dist:
                min_dist = distances[j][i]
                min_coords_i = i
        if min_dist > MAX_DIST_GEO:
            not_found_ctr += 1
            #samples_data[j] = None
        else:
            samples_data[j][value_field] = values[min_coords_i]
            
    print("No value for n of m samples:", not_found_ctr, len(samples))
    return (samples, samples_data)



datasources = [
#    ("ecoregions_baseline.png", legend_ecoregions, "baseline"),
#    ("wildfire_rcp26_frequency.png", legend_frequency, "rcp26_freq"),
#    ("wildfire_rcp26_season_length.png", legend_season_length, "rcp26_slen"),
#    ("wildfire_rcp34_frequency.png", legend_frequency, "rcp34_freq"),
#    ("wildfire_rcp34_season_length.png", legend_season_length, "rcp34_slen"),
#    ("wildfire_rcp85_frequency.png", legend_frequency, "rcp85_freq"),
    ("wildfire_rcp85_season_length.png", legend_season_length, "rcp85_slen"),
]

def process():
    print("Reading maps...")
    samples, values = sample_equalarea("working/wildfire_rcp85_frequency.png", legend_frequency)
    samples_data = [{} if values[i] != -1 else None for i in range(len(samples))]

    for source in datasources:
        print("===", source[0])
        #coords, values = digitize_map("working/"+source[0], source[1])
        coords, values = read_json("working/"+source[0]+".cache.json")

        samples, samples_data = reduce_to_nearest(samples, samples_data, coords, values, source[2])

    print("Writing geojson...")
    geojson = to_geojson(samples, samples_data)
    write_json("wildfires.geojson", geojson)


def togrid():
    samples_data = read_json("wildfires.geojson")
    p = utils.HoboDyerProj()

    els = [sample["properties"]["rcp85_slen"] if sample["properties"] is not None and "rcp85_slen" in sample["properties"] else 10 for sample in samples_data["features"]]
    out = ""
    for i in range(len(els)):
        if i%p.width == 0 and i != 0:
            out += "\n"
        out += str(els[i])+" "

    with open("wf.dat", 'w') as f:
        f.write(out)

#process()
togrid()