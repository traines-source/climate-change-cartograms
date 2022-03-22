#!/bin/bash
set -e

SCRIPT_DIR=${SCRIPT_DIR:-$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )}
INPUT_DIR=${INPUT_DIR:-$SCRIPT_DIR}

echo "Building image..."
DOCKER_IMAGE=$(cat ./Dockerfile | docker build -q -)
echo "Running..."

mkdir -p $SCRIPT_DIR/working
#rm $SCRIPT_DIR/working/*
#rm $SCRIPT_DIR/../dist/permutations/*.csv

docker run -it --rm \
-u $(id -u):$(id -g) \
-e SCRIPT_DIR=${SCRIPT_DIR} \
-e INPUT_DIR=${INPUT_DIR} \
-v ${SCRIPT_DIR}:${SCRIPT_DIR} \
-v ${INPUT_DIR}:${INPUT_DIR} \
--workdir ${SCRIPT_DIR} \
$DOCKER_IMAGE \
python3 generate_permutations.py

mv working/*.csv ../dist/permutations/