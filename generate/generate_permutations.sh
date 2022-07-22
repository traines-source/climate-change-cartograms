#!/bin/bash
set -e

SCRIPT_DIR=${SCRIPT_DIR:-$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )}

echo "Building image..."
DOCKER_IMAGE=$(cat ${SCRIPT_DIR}/Dockerfile | docker build -q -)
echo "Running..."

mkdir -p $SCRIPT_DIR/working
rm -f $SCRIPT_DIR/working/*
rm -f $SCRIPT_DIR/../dist/permutations/*.csv

docker run -it --rm \
-u $(id -u):$(id -g) \
-e SCRIPT_DIR=${SCRIPT_DIR} \
-v ${SCRIPT_DIR}:${SCRIPT_DIR} \
--workdir ${SCRIPT_DIR} \
$DOCKER_IMAGE \
python3 generate_permutations.py

mv ${SCRIPT_DIR}/working/*.csv ${SCRIPT_DIR}/../dist/permutations/