import csv
import json
import sys
sys.path.append('../')
import utils

TARGET_RESOLUTION=(400,200)
TEXTURE_SCALE=8192/400.0
DOT_SIZE=25
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

def write_json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f)

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

write_json('working/cities.json', to_json(selected_cites))

with open("working/imagemagick_cities_cmd.txt", "w") as f:
    f.write(imagemagick_cities_cmd)