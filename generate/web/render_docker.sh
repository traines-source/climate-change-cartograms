#!/bin/bash
set -e

SCRIPT_DIR=${SCRIPT_DIR:-$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )/../" &> /dev/null && pwd )}

echo "Building image..."
DOCKER_IMAGE=$(cat ${SCRIPT_DIR}/Dockerfile | docker build -q -)
echo "Running..."

mkdir -p $SCRIPT_DIR/web/working

docker run -it --rm \
-u $(id -u):$(id -g) \
-e SCRIPT_DIR=${SCRIPT_DIR} \
-v ${SCRIPT_DIR}:${SCRIPT_DIR} \
--workdir ${SCRIPT_DIR}/web/ \
$DOCKER_IMAGE \
bash render.sh

rm -rf ${SCRIPT_DIR}/../dist/www/*/
mv ${SCRIPT_DIR}/web/working/* ${SCRIPT_DIR}/../dist/www/