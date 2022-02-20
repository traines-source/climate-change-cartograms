#!/bin/bash
set -e

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
GRASS_DIR=$1

echo "=== Starting... ==="

test -d ${GRASS_DIR}/wgs84 || grass -e -c epsg:4326 ${GRASS_DIR}/wgs84
test -d ${GRASS_DIR}/wgs84/PERMANENT || grass -e -c ${GRASS_DIR}/wgs84/PERMANENT
test -d ${GRASS_DIR}/hoboDyer || grass -c epsg:4326 ${GRASS_DIR}/hoboDyer --exec g.proj -c proj4='+proj=cea +lon_0=0 +lat_ts=37.5 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs'
test -d ${GRASS_DIR}/hoboDyer/PERMANENT || grass -e -c ${GRASS_DIR}/hoboDyer/PERMANENT

echo "wgs84..."
export GRASS_BATCH_JOB=${SCRIPT_DIR}/grass_0_wgs84.sh
grass ${GRASS_DIR}/wgs84/PERMANENT

echo "hoboDyer..."
export GRASS_BATCH_JOB=${SCRIPT_DIR}/grass_1_hoboDyer.sh
grass ${GRASS_DIR}/hoboDyer/PERMANENT