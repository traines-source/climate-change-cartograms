#!/bin/bash
set -e

g.region $(r.proj input=population2020 output=population2020_proj location=wgs84 mapset=PERMANENT method=bilinear_f -g)
g.region nsres=26528 ewres=26528 # 1200x

#g.region -p -l -e -b

reprojectAndSave () {

    r.proj input=${2} output=${1}_proj location=wgs84 mapset=PERMANENT method=bilinear_f --overwrite

    echo "Normalizing..."
    r.mapcalc "${1}_norm = isnull(${1}_proj) ? 0.0 : min(1.0, max(${1}_proj, 0.0))" --overwrite

    #r.univar ${1}_norm

    echo "Outputting..."
    r.colors map=${1}_norm color=grey
    r.out.gdal in=${1}_norm output=${SCRIPT_DIR}/out/${1}.tiff type=Float32 --overwrite -f -c
    r.out.png -t --overwrite input=${1}_norm output=${SCRIPT_DIR}/out/${1}.png
    echo "Done."
}

reprojectAndSave "wf_baseline" "wf_historical"
reprojectAndSave "wf_rcp26" "wf_rcp26"
reprojectAndSave "wf_rcp45" "wf_rcp45"
reprojectAndSave "wf_rcp60" "wf_rcp60"
reprojectAndSave "wf_rcp85" "wf_rcp85"

chmod a+r ${SCRIPT_DIR}/out/*
