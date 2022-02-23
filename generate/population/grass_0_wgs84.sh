#!/bin/bash
set -e

#r.mask -r
g.region n=90 s=-90 w=-180 e=180 nsres=0:02:30 ewres=0:02:30

echo "Importing Population..."
# Unzipped 2.5arcmin data from https://sedac.ciesin.columbia.edu/data/collection/gpw-v4/sets/browse
density=${INPUT_DIR}/gpw_v4_population_density_adjusted_to_2015_unwpp_country_totals_rev11_2020_2pt5_min.tif
r.in.gdal input=$density output=population_baseline --overwrite

#total=${INPUT_DIR}/gpw_v4_land_water_area_rev11_landareakm_2pt5_min.tif
#r.in.gdal input=$total output=population2020_area --overwrite
#r.mapcalc "population2020_total = population2020 * population2020_area" --overwrite
#r.univar population2020_total

countries=${INPUT_DIR}/gpw_v4_national_identifier_grid_rev11_2pt5_min.tif
r.in.gdal input=$countries output=countries --overwrite

#r.univar -t zones=countries map=population2020_total
#r.recode input=countries output=population_errors rules=population_countries_errors.csv --overwrite
#r.colors map=population_errors color=differences
#r.out.png -t --overwrite input=population_errors output=${SCRIPT_DIR}/out/errors.png

echo "Projecting 2100 population densities..."
#r.category map=countries
#r.reclass input=countries output=population_increase rules=population_countries_increase.reclass.csv --overwrite
r.recode input=countries output=population_increase rules=${SCRIPT_DIR}/population_countries_increase.csv --overwrite
r.mapcalc "population_2100 = population_baseline * population_increase" --overwrite

echo "Done."