#!/bin/bash
set -e

g.region $(r.proj input=population2020 output=population2020_proj location=wgs84 mapset=PERMANENT method=bilinear_f -g)
g.region nsres=26528 ewres=26528 # 1200x

#g.region -p -l -e -b

reprojectAndSave () {

    r.proj input=${1} output=${1}_proj location=wgs84 mapset=PERMANENT method=bilinear_f --overwrite

    #r.proj input=countries output=countries location=wgs84 mapset=PERMANENT method=nearest --overwrite
    #r.univar -t zones=countries map=${1}_proj output=out/population_countries_univar_proj.csv --overwrite

    echo "Normalizing..."
    r.mapcalc "${1}_norm = isnull(${1}_proj) ? 0.0 : min(1.0, ${1}_proj/30000.0)" --overwrite

    r.univar ${1}_norm

    echo "Outputting..."
    r.colors map=${1}_norm color=grey
    r.out.gdal in=${1}_norm output=${SCRIPT_DIR}/out/${1}.tiff type=Float32 --overwrite -f -c
    r.out.png -t --overwrite input=${1}_norm output=${SCRIPT_DIR}/out/${1}.png
    echo "Done."
}

reprojectAndSave "population2020"
reprojectAndSave "population2100"

chmod a+r ${SCRIPT_DIR}/out/*
