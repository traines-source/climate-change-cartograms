#!/bin/bash
set -e

g.region $(r.proj input=sealevel_population output=sealevel_population location=wgs84 mapset=PERMANENT method=bilinear_f -g)
g.region nsres=26528 ewres=26528 # 1200x

cd $SCRIPT_DIR
python3 adjust_sealevels.py
cd -

MAX_SEALEVEL=10

adjustSealevels () {
    echo "Adjusting sealevel $1"
    M=sealevel_${1}_mapping
    SEALEVEL=1
    MAPCALC_STRING="isnull(flooding_0) ? 0 : flooding_0*0.5"
    while [ $SEALEVEL -ne $MAX_SEALEVEL ]
    do
        MAPCALC_STRING="if(${M}==${SEALEVEL}, isnull(flooding_${SEALEVEL}) ? 0 : flooding_${SEALEVEL}*0.5+flooding_$(($SEALEVEL-1))*0.5, ${MAPCALC_STRING})"
        SEALEVEL=$(($SEALEVEL+1))
    done
    echo $MAPCALC_STRING
    r.recode input=sealevel_countries output=$M rules=${SCRIPT_DIR}/working/${1}.csv --overwrite
    r.mapcalc "sealevel_${1} = ${MAPCALC_STRING}" --overwrite

    r.univar sealevel_${1}

    echo "Outputting..."
    r.colors map=sealevel_${1} color=grey
    r.out.gdal in=sealevel_${1} output=${SCRIPT_DIR}/out/sealevel_${1}.tiff type=Float32 --overwrite -f -c
    r.out.png -t --overwrite input=sealevel_${1} output=${SCRIPT_DIR}/out/sealevel_${1}.png
    echo "Done."
}

adjustSealevels "baseline"
adjustSealevels "rcp26"
adjustSealevels "rcp45"
adjustSealevels "rcp85"



chmod a+r ${SCRIPT_DIR}/out/*
