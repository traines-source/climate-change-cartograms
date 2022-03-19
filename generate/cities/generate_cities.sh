#!/bin/bash
set -e

SCRIPT_DIR=${SCRIPT_DIR:-$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )/../" &> /dev/null && pwd )}
INPUT_DIR=${INPUT_DIR:-$SCRIPT_DIR}

echo "Building image..."
DOCKER_IMAGE=$(cat ../Dockerfile | docker build -q -)
echo "Running..."

mkdir -p $SCRIPT_DIR/working

docker run -it --rm \
-u $(id -u):$(id -g) \
-e SCRIPT_DIR=${SCRIPT_DIR} \
-e INPUT_DIR=${INPUT_DIR} \
-v ${SCRIPT_DIR}:${SCRIPT_DIR} \
-v ${INPUT_DIR}:${INPUT_DIR} \
--workdir ${SCRIPT_DIR}/cities/ \
$DOCKER_IMAGE \
python3 generate_cities.py

mv working/*.json ../../res/