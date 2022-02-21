#!/bin/bash
set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

g.region $(r.proj input=population2020 location=wgs84 mapset=PERMANENT method=bilinear_f -g)
g.region nsres=3316 ewres=3316 # 9600x

#g.region -p -l -e -b

r.proj input=ortho.red output=ortho.red location=equirect mapset=PERMANENT method=nearest --overwrite
r.proj input=ortho.green output=ortho.green location=equirect mapset=PERMANENT method=nearest --overwrite
r.proj input=ortho.blue output=ortho.blue location=equirect mapset=PERMANENT method=nearest --overwrite

i.group group=ortho input=ortho.red,ortho.green,ortho.blue --overwrite

#r.out.png -t --overwrite input=ortho output=${SCRIPT_DIR}/out/map.png
r.out.gdal format=PNG input=ortho output=${SCRIPT_DIR}/out/map.png --overwrite

chmod a+r ${SCRIPT_DIR}/out/*
