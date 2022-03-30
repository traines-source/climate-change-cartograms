#!/bin/bash
set -e

DOT_SIZE=65

mkdir -p working

hoboDyer='+proj=cea +lon_0=0 +lat_ts=37.5 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs'

#cat /etc/ImageMagick-6/policy.xml
#convert -list resource
#gdalinfo ${INPUT_DIR}/world_500m/world.topo.200407.3x21600x21600.A1_geo.tif
#montage -mode concatenate -tile 4x ${INPUT_DIR}/world_500m/world.topo.200407.3x21600x21600.{A1,B1,C1,D1,A2,B2,C2,D2}.png ${INPUT_DIR}/world_500m/joined.tiff
#gdalwarp -overwrite -r bilinear -ts 86400 0 -t_srs "$hoboDyer" ${INPUT_DIR}/world_500m/world.topo.200407.3x21600x21600.{A1,B1,C1,D1,A2,B2,C2,D2}_geo.tif ${INPUT_DIR}/world_500m/equalarea_86400.tif

#for f in ${INPUT_DIR}/world_500m/world.topo.200407.3x21600x21600.{A1,B1,C1,D1,A2,B2,C2,D2}_geo.tif; do
#    gdalwarp -overwrite -r bilinear -ts 21600 0 -t_srs "$hoboDyer" $f ${INPUT_DIR}/world_500m/equalarea/$(basename $f)
#done

python3 generate_cities.py

convert dot.png -resize ${DOT_SIZE}x working/dot_resized.png

# from https://neo.gsfc.nasa.gov/archive/bluemarble/bmng/world_2km/
photo=${INPUT_DIR}/world_2km/world.topo.200407.3x21600x10800.png
gdalwarp -overwrite -r bilinear -ts 21600 0 -s_srs 'epsg:4326' -t_srs "$hoboDyer" $photo ${INPUT_DIR}/world_500m/equalarea/21600.tif

echo "convert ${INPUT_DIR}/world_500m/equalarea/21600.tif -gravity north \( -size 21600x10800 xc:transparent $(cat working/imagemagick_cities_cmd.txt) -flatten \) -composite working/map.tif" | bash
echo "Downsampling..."
convert working/map.tif -gravity north -resize 16384x -extent 16384x8192 working/map_16384x.jpg
convert working/map.tif -gravity north -resize 8192x -extent 8192x4096 working/map_8192x.jpg
convert working/map.tif -gravity north -resize 4096x -extent 4096x2048 working/map_4096x.jpg
convert working/map.tif -gravity north -resize 2048x -extent 2048x1024 working/map_2048x.jpg
convert working/map.tif -gravity north -resize 1024x -extent 1024x512 working/map_1024x.jpg

