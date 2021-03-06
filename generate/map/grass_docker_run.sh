#!/bin/bash
set -e

SCRIPT_DIR=${SCRIPT_DIR:-$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )/../" &> /dev/null && pwd )}
INPUT_DIR=${INPUT_DIR:-$SCRIPT_DIR}

echo "Building image..."
DOCKER_IMAGE=$(cat ${SCRIPT_DIR}/Dockerfile | docker build -q -)
echo "Running..."

docker run -it --rm \
-u $(id -u):$(id -g) \
-e SCRIPT_DIR=${SCRIPT_DIR} \
-e INPUT_DIR=${INPUT_DIR} \
-v ${SCRIPT_DIR}:${SCRIPT_DIR} \
-v ${INPUT_DIR}:${INPUT_DIR} \
-v grassdb:/grassdb/ \
--workdir ${SCRIPT_DIR}/map/ \
$DOCKER_IMAGE \
bash ${SCRIPT_DIR}/map/grass_run.sh

mv ${SCRIPT_DIR}/map/working/map*.jpg ${SCRIPT_DIR}/../dist/
mv ${SCRIPT_DIR}/map/working/mappings.json ${SCRIPT_DIR}/../dist/