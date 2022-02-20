#!/bin/bash
set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

POPULATION_INPUT_DIR=${POPULATION_INPUT_DIR:-$SCRIPT_DIR}

#r.mask -r
g.region n=90 s=-90 w=-180 e=180 nsres=0.0416667 ewres=0.0416667 #2.5arcmin

echo "Importing Population..."
# Unzipped 2.5arcmin data from https://sedac.ciesin.columbia.edu/data/collection/gpw-v4/sets/browse
density=${POPULATION_INPUT_DIR}/gpw_v4_population_density_adjusted_to_2015_unwpp_country_totals_rev11_2020_2pt5_min.tif
r.import input=$density output=population2020 --overwrite

r.univar population2020

countries=${POPULATION_INPUT_DIR}/gpw_v4_national_identifier_grid_rev11_2pt5_min.tif
r.import input=$countries output=countries --overwrite

echo "Projecting 2100 population densities..."
r.category map=countries
#r.reclass input=countries output=population_increase rules=population_countries_increase.reclass.csv --overwrite
r.recode input=countries output=population_increase rules=population_countries_increase.csv --overwrite
r.mapcalc "population2100 = population2020 * population_increase" --overwrite

echo "Done."