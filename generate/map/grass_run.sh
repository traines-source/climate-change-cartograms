#!/bin/bash
set -e

DOT_SIZE=50

mkdir -p working

hoboDyer='+proj=cea +lon_0=0 +lat_ts=37.5 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs'

python3 generate_cities.py 

# from https://neo.gsfc.nasa.gov/archive/bluemarble/bmng/world_2km/
photo=${INPUT_DIR}/world.topo.200407.3x21600x10800.png

gdalwarp -overwrite -r bilinear -ts 16384 0 -s_srs 'epsg:4326' -t_srs "$hoboDyer" $photo working/map.tif
convert dot.png -resize ${DOT_SIZE}x working/dot_resized.png

echo "convert working/map.tif -gravity north \( -size 16384x8192 xc:transparent $(cat working/imagemagick_cities_cmd.txt) -flatten \) -composite working/map.png" | bash
convert working/map.png -gravity north -extent 16384x8192 working/map_16384x.jpg
convert working/map.png -gravity north -resize 8192x -extent 8192x4096 working/map_8192x.jpg
convert working/map.png -gravity north -resize 4096x -extent 4096x2048 working/map_4096x.jpg
convert working/map.png -gravity north -resize 2048x -extent 2048x1024 working/map_2048x.jpg
convert working/map.png -gravity north -resize 1024x -extent 1024x512 working/map_1024x.jpg
