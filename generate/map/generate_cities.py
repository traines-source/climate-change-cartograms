import csv
import math
import statistics
import sys
import numpy as np
sys.path.append('../')
import utils
import os
import cv2

TARGET_RESOLUTION=(600,300)
TEXTURE_WIDTH=21600
RATIO=TARGET_RESOLUTION[1]/TARGET_RESOLUTION[0]
TEXTURE_HEIGHT=TEXTURE_WIDTH*RATIO
TEXTURE_SCALE=TEXTURE_WIDTH/TARGET_RESOLUTION[0]
TILE_WIDTH=21600
TILE_HEIGHT=TILE_WIDTH*RATIO
TILES_PER_ROW=4
TRIANGLE_DIMEN=int(TILE_WIDTH*TILES_PER_ROW/TARGET_RESOLUTION[0])
DOT_SIZE=65
CITY_COUNT = 40
MAX_CITIES_PER_COUNTRY = 1

proj = utils.HoboDyerProj(TARGET_RESOLUTION[0])

def sort_key(city):
    return city['population']

def to_json(cities):
    print(proj.transform((0, -90)))
    print(proj.reverse_transform((200, 200)))
    return [
        {
            "coordinates": proj.transform((city['lon'], city['lat'])),
            "name": city['name'],
            "population": city['population']
        } for city in cities
    ]

def get_int(s):
    try:
        return int(s)
    except ValueError:
        return 0

def get_imagemagick_city_cmd(city):
    c = proj.transform((city['lon'], city['lat']))
    return "\( -background transparent working/dot_resized.png -repage +" + str(round(c[0]*TEXTURE_SCALE-DOT_SIZE/2, 1)) + "+" + str(round(c[1]*TEXTURE_SCALE-DOT_SIZE/2, 1)) + " \) "

cities = []
countries = {}

with open('worldcities.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(reader)
    for row in reader:
        cities.append({'name': row[0], 'lat': float(row[2]), 'lon': float(row[3]), 'population': get_int(row[9]), 'country': row[6]})
        countries[row[6]] = 0

cities.sort(key=sort_key, reverse=True)

selected_cites = []
imagemagick_cities_cmd = ""
i = 0
for city in cities:
    if countries[city['country']] < MAX_CITIES_PER_COUNTRY:
        selected_cites.append(city)
        imagemagick_cities_cmd += get_imagemagick_city_cmd(city)
        countries[city['country']] += 1
        i += 1
        if i >= CITY_COUNT:
            break

cities_json = to_json(selected_cites)
utils.write_json('working/cities.json', cities_json)

with open("working/imagemagick_cities_cmd.txt", "w") as f:
    f.write(imagemagick_cities_cmd)

"""
hires_triangles = utils.read_json('working/hires_triangles.json')

def area(triangle):
    return triangle['area']

def index(triangle):
    return triangle['index']
hires_triangles.sort(key=area, reverse=True)

def triangle_width_pixels(gridarea):
    return math.sqrt(gridarea*2)*standard_display_resolution/TARGET_RESOLUTION[0]

def available_pixels(texture_width):
    texture_height=texture_width/TARGET_RESOLUTION[0]*TARGET_RESOLUTION[1]
    return texture_width*texture_height

standard_display_resolution=1920
standard_texture_width=8192
print("Standard triangle resolution is:", standard_texture_width/TARGET_RESOLUTION[0])
print (hires_triangles[0])
print("Max triangle resolution encountered:", triangle_width_pixels(hires_triangles[0]['area']))
areas = [area(t) for t in hires_triangles]
print("Quantiles hires triangle resolution (0.5, 0.7, 0.9): ", [triangle_width_pixels(t) for t in np.quantile(np.array(areas), [0.5,0.7,0.9])])
print("Number of potential hires triangles:", len(hires_triangles), "of", TARGET_RESOLUTION[0]*TARGET_RESOLUTION[1]*2)
print("Max triangle resolution to (theoretically) lodge all hires triangles:", math.sqrt(available_pixels(standard_texture_width)/len(hires_triangles)*2))
print("In terms of TEXTURE_WIDTH", TEXTURE_WIDTH, "that is:", math.sqrt(available_pixels(TEXTURE_WIDTH)/len(hires_triangles)*2))
print("Max available triangle resolution is:", TILE_WIDTH*TILES_PER_ROW/TARGET_RESOLUTION[0])
print("Set HIRES_TRIANGLES_PER_ROW accordingly.")
HIRES_TRIANGLES_PER_ROW=60
print("Theoretically lodging triangles:", HIRES_TRIANGLES_PER_ROW**2)

max_count = (HIRES_TRIANGLES_PER_ROW**2)/2
even_triangles = []
odd_triangles = []
for t in hires_triangles:
    if len(even_triangles) >= max_count or len(odd_triangles) >= max_count:
        break
    if t['index'] % 2 == 0:
        even_triangles.append(t)
    else:
        odd_triangles.append(t)

even_triangles.sort(key=index)
odd_triangles.sort(key=index)
print("Actually lodging triangles:", len(even_triangles)+len(odd_triangles))

def xy(el_index, el_per_row, el_width, el_height):
    return ((el_index%el_per_row)*el_width, el_index//el_per_row*el_height)

def in_boundaries(tile_index, triangle_tl, triangle_br):
    tile_tl = xy(tile_index, TILES_PER_ROW, TILE_WIDTH, TILE_HEIGHT)
    tile_br = (tile_tl[0]+TILE_WIDTH, tile_tl[1]+TILE_HEIGHT)
    tl_out = triangle_tl[0] < tile_tl[0] or triangle_tl[1] < tile_tl[1]
    br_out = triangle_br[0] > tile_br[0] or triangle_br[1] > tile_br[1]
    if tl_out or br_out:
        return False
    return True

def triangle_tlbr(triangle, is_even):
    tl = triangle['coords'][2]
    if not is_even:
        tl = (triangle['coords'][1][0], triangle['coords'][0][1])
    tl = (tl[0]*TRIANGLE_DIMEN, tl[1], TRIANGLE_DIMEN)
    return (tl, (tl[0]+TRIANGLE_DIMEN, tl[1]+TRIANGLE_DIMEN))

def mask_evenodd(is_even):
    mask = np.ones((TRIANGLE_DIMEN, TRIANGLE_DIMEN, 3))
    if is_even:
        mask = np.tril(mask)
    else:
        mask = np.triu(mask)
    np.flip(mask, axis=0)
    return mask

def copy_triangle(triangle, is_even, tile_index, tile, target, target_index):
    if 'written' in triangle:
        return False
    tl, br = triangle_tlbr(triangle, is_even)
    if not in_boundaries(tile_index, tl, br):
        return False
    mask = mask_evenodd(is_even)
    tile_tl = xy(tile_index, TILES_PER_ROW, TILE_WIDTH, TILE_HEIGHT)
    rel_tl = (int(tl[0]-tile_tl[0]), int(tl[1]-tile_tl[1]))
    #print("tl", rel_tl)
    bboxed = tile[rel_tl[1]:rel_tl[1]+TRIANGLE_DIMEN, rel_tl[0]:rel_tl[0]+TRIANGLE_DIMEN]
    #print("bbox", bboxed.shape)
    masked = bboxed*mask
    target_tl = xy(target_index, HIRES_TRIANGLES_PER_ROW, TRIANGLE_DIMEN, TRIANGLE_DIMEN)
    target[target_tl[1]:target_tl[1]+TRIANGLE_DIMEN, target_tl[0]:target_tl[0]+TRIANGLE_DIMEN] += masked
    triangle['written'] = True
    return True

    
tiles = ['A1','B1','C1','D1','A2','B2','C2','D2']

all_indices = []
print(TRIANGLE_DIMEN, RATIO)
target = np.zeros((int(TRIANGLE_DIMEN*HIRES_TRIANGLES_PER_ROW*RATIO), TRIANGLE_DIMEN*HIRES_TRIANGLES_PER_ROW, 3))
print("Intermediate target shape:", target.shape)
for tile_index, tile_id in enumerate(tiles):
    print("Tile", tile_id)
    tile = cv2.imread(os.environ.get('INPUT_DIR')+"/world_500m/equalarea/world.topo.200407.3x21600x21600."+tile_id+"_geo.tif")
    print("tile shape", tile.shape)
    print("Even triangles...")
    for target_index, triangle in enumerate(even_triangles):
        if copy_triangle(triangle, True, tile_index, tile, target, target_index):
            all_indices.append(triangle['index'])
    print("Odd triangles...")
    for target_index, triangle in enumerate(odd_triangles):
        if copy_triangle(triangle, False, tile_index, tile, target, target_index):
            all_indices.append(triangle['index'])

all_indices.sort()
print("Finally lodged triangles:", len(all_indices))
print("Missing triangles:")
all_triangles = even_triangles+odd_triangles
for t in all_triangles:
    if not 'written' in t:
        print(t)

cv2.imwrite("working/hires_triangles.png", target)
"""
mappings = utils.read_json('../emissions/mappings.json')
mappings['cities'] = {'mapping': cities_json}
#mappings['hires_triangles'] = {'mapping': all_indices}
utils.write_json('working/mappings.json', mappings)        

            

    





