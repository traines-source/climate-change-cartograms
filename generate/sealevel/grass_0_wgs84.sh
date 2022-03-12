#!/bin/bash
set -e


#g.region n=60 s=0 w=0 e=30 nsres=0.0025 ewres=0.0025
g.region n=60 s=-60 w=-180 e=180 nsres=0.005 ewres=0.005

echo "Importing..."
MAPS=""
# Unzipped data from https://srtm.csi.cgiar.org/wp-content/uploads/files/srtm_30x30/ASCII/
for tile in ${INPUT_DIR}/elevation/cgiar/unzipped/cut*.asc ; do
  outname=cgiar_`basename $tile .asc`
  MAPS=${outname},${MAPS}
  r.external input=$tile output=$outname -o
done
echo "Mosaicing..."
r.patch --overwrite input=$MAPS output=cgiar_mosaic
echo "Done."

echo "Zeroing..."
r.mapcalc expression="cgiar_zeroed = isnull(cgiar_mosaic) ? 0 : cgiar_mosaic" --overwrite
echo "Laking..."
r.lake --overwrite elevation=cgiar_zeroed water_level=20 lake=lake coordinates=-15,0
echo "Done."