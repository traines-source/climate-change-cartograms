#!/bin/bash
set -e

SCRIPT_DIR=${SCRIPT_DIR:-$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )}
INPUT_DIR=${INPUT_DIR:-$SCRIPT_DIR}

echo "Building image..."
DOCKER_IMAGE=$(cat ./Dockerfile | docker build -q -)
echo "Running..."

mkdir -p $SCRIPT_DIR/working
cp $SCRIPT_DIR/../res/mappings.json $SCRIPT_DIR/working/

docker run -it --rm \
-e SCRIPT_DIR=${SCRIPT_DIR} \
-e INPUT_DIR=${INPUT_DIR} \
-v ${SCRIPT_DIR}:${SCRIPT_DIR} \
-v ${INPUT_DIR}:${INPUT_DIR} \
--workdir ${SCRIPT_DIR} \
$DOCKER_IMAGE \
python3 generate_permutations.py