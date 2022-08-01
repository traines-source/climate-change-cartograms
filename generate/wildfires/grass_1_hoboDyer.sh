#!/bin/bash
set -e

g.region $(r.proj input=population2020 output=population2020_proj location=wgs84 mapset=PERMANENT method=bilinear_f -g)
g.region nsres=26528 ewres=26528 # 1200x

#g.region -p -l -e -b

reprojectAndSave () {

    r.proj input=${2} output=${1}_proj location=wgs84 mapset=PERMANENT method=bilinear_f --overwrite

    echo "Normalizing with burnability..."
    r.mapcalc "${1}_norm = isnull(${1}_proj) ? 0.0 : min(1.0, max(${1}_proj*wf_burnability, 0.0))" --overwrite

    #r.univar ${1}_norm

    echo "Outputting..."
    r.colors map=${1}_norm color=grey
    r.out.gdal in=${1}_norm output=${SCRIPT_DIR}/out/${1}.tiff type=Float32 --overwrite -f -c
    r.out.png -t --overwrite input=${1}_norm output=${SCRIPT_DIR}/out/${1}.png
    echo "Done."
}

echo "Burnability..."
r.in.gdal input=${SCRIPT_DIR}/out/wf_burnability_baseline.tiff output=wf_burnability --overwrite


reprojectAndSave "wildfires_baseline" "wf_historical"
reprojectAndSave "wildfires_rcp26" "wf_rcp26"
reprojectAndSave "wildfires_rcp45" "wf_rcp45"
reprojectAndSave "wildfires_rcp60" "wf_rcp60"
reprojectAndSave "wildfires_rcp85" "wf_rcp85"

r.mapcalc "wf_diff_26 = max(0, wf_rcp26_norm-wf_baseline_norm)" --overwrite
r.colors map=wf_diff_26 color=grey
r.out.png -t --overwrite input=wf_diff_26 output=${SCRIPT_DIR}/out/wf_diff_26.png


r.mapcalc "wf_diff_85 = max(0, wf_rcp85_norm-wf_baseline_norm)" --overwrite
r.colors map=wf_diff_85 color=grey
r.out.png -t --overwrite input=wf_diff_85 output=${SCRIPT_DIR}/out/wf_diff_85.png

chmod a+r ${SCRIPT_DIR}/out/*
