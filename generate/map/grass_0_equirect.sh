#!/bin/bash
set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

INPUT_DIR=${INPUT_DIR:-$SCRIPT_DIR}

#r.mask -r
echo "Importing orthophoto...1"
r.proj input=population2020 output=population2020_proj location=wgs84 mapset=PERMANENT method=bilinear_f -g
echo "Importing orthophoto..2"
#g.region --verbose $(r.proj input=population2020 location=wgs84 mapset=PERMANENT method=bilinear_f -g)
#g.region nsres=0.0166666667 ewres=0.0166666667

echo "Importing orthophoto..."
# image from https://neo.gsfc.nasa.gov/archive/bluemarble/bmng/world_2km/world.topo.200407.3x21600x10800.png
photo=${INPUT_DIR}/world.topo.200407.3x21600x10800.png
r.in.gdal --verbose input=$photo output=ortho -o --overwrite

echo "Done."