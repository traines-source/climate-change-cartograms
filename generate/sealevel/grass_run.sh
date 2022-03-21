#!/bin/bash
set -e

echo "=== Starting... ==="
test -d wgs84 || grass -e -c epsg:4326 wgs84
test -d hoboDyer || grass -c XY hoboDyer --exec g.proj -c proj4='+proj=cea +lon_0=0 +lat_ts=37.5 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +no_defs'

echo "wgs84..."
grass wgs84/PERMANENT --exec bash ${SCRIPT_DIR}/grass_0_wgs84.sh
grass wgs84/PERMANENT --exec bash ${SCRIPT_DIR}/grass_1_wgs84.sh

echo "hoboDyer..."
grass hoboDyer/PERMANENT --exec bash ${SCRIPT_DIR}/grass_2_hoboDyer.sh
grass hoboDyer/PERMANENT --exec bash ${SCRIPT_DIR}/grass_3_hoboDyer.sh