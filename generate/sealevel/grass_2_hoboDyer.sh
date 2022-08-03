#!/bin/bash
set -e

SKM_PER_PIXEL=703.78 # for 1200x

g.region $(r.proj input=sealevel_population output=sealevel_population location=wgs84 mapset=PERMANENT method=bilinear_f -g)
g.region nsres=26528 ewres=26528 # 1200x

#g.region -p -l -e -b


echo "Reprojecting metadata..."
r.proj input=sealevel_population output=sealevel_population location=wgs84 mapset=PERMANENT method=bilinear_f --overwrite
r.proj input=sealevel_countries output=sealevel_countries location=wgs84 mapset=PERMANENT method=nearest --overwrite

r.mapcalc "sealevel_population_abs = sealevel_population * ${SKM_PER_PIXEL}" --overwrite
r.univar sealevel_population_abs

echo "Reprojecting sealevels..."
SEALEVEL=0
MAX_SEALEVEL=10
while [ $SEALEVEL -ne $MAX_SEALEVEL ]
do
    echo "$SEALEVEL"
    r.proj input=flooding_${SEALEVEL} output=flooding_${SEALEVEL} location=wgs84 mapset=PERMANENT method=bilinear_f --overwrite
    r.mapcalc "flooding_${SEALEVEL}_pop = sealevel_population_abs * flooding_${SEALEVEL}" --overwrite
    r.univar -t zones=sealevel_countries map=flooding_${SEALEVEL}_pop output=${SCRIPT_DIR}/working/flooding_${SEALEVEL}_pop.csv --overwrite
    SEALEVEL=$(($SEALEVEL+1))
done