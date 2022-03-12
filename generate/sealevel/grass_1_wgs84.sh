#!/bin/bash
set -e


g.region n=60 s=-60 w=-180 e=180 nsres=0.005 ewres=0.005

echo "Rising sealevel..."

SEALEVEL=0
MAX_SEALEVEL=10
while [ $SEALEVEL -ne $MAX_SEALEVEL ]
do
    echo "$SEALEVEL"
    r.mapcalc --overwrite expression="flooding_${SEALEVEL} = ( cgiar_mosaic <= ${SEALEVEL} && !isnull(lake) ) ? 1 : 0"
    SEALEVEL=$(($SEALEVEL+1))
done

echo "Importing Population..."
# Unzipped 2.5arcmin data from https://sedac.ciesin.columbia.edu/data/collection/gpw-v4/sets/browse
density=${INPUT_DIR}/population/gpw/gpw_v4_population_density_adjusted_to_2015_unwpp_country_totals_rev11_2020_2pt5_min.tif
r.in.gdal input=$density output=sealevel_population --overwrite

echo "Importing countries..."
countries=${INPUT_DIR}/population/gpw/gpw_v4_national_identifier_grid_rev11_2pt5_min.tif
r.in.gdal input=$countries output=sealevel_countries --overwrite

echo "Done."