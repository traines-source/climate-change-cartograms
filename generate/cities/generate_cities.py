import csv
import json
import utils

TARGET_RESOLUTION=(400,200)

class HoboDyerProj(utils.Proj):
    proj4 = "+proj=cea +lon_0=0 +lat_ts=37.5 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"

    def __init__(self):
        super().__init__(HoboDyerProj.proj4, TARGET_RESOLUTION[0])

def sort_key(city):
    return city['population']

def to_json(cities):
    proj = HoboDyerProj()
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

cities = []
countries = {}
CITY_COUNT = 30
MAX_CITIES_PER_COUNTRY = 2

with open('worldcities.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(reader)
    for row in reader:
        cities.append({'name': row[0], 'lat': float(row[2]), 'lon': float(row[3]), 'population': get_int(row[9]), 'country': row[6]})
        countries[row[6]] = 0

cities.sort(key=sort_key, reverse=True)

selected_cites = []
for city in cities:
    if countries[city['country']] < MAX_CITIES_PER_COUNTRY:
        selected_cites.append(city)
        countries[city['country']] += 1

write_json('working/cities.json', to_json(selected_cites[0:CITY_COUNT]))

