#!/bin/bash
set -e

hoboDyer='+proj=cea +lon_0=0 +lat_ts=37.5 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs'
photo=${INPUT_DIR}/world.topo.200407.3x21600x10800.png

gdalwarp -overwrite -r bilinear -ts 8192 0 -s_srs 'epsg:4326' -t_srs "$hoboDyer" $photo /tmp/map.tif
convert /tmp/map.tif -gravity north -extent 8192x4096 ${SCRIPT_DIR}/out/map.jpg