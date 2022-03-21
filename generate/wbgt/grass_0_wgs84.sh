#!/bin/bash
set -e

#r.mask -r
g.region n=90 s=-90 w=-180 e=180 nsres=1.25 ewres=1.25

echo "Importing DEM..."
MAPS=""
# Unzipped data from http://www.webgis.com/terr_world.html
for tile in ${INPUT_DIR}/mirror/www.webgis.com/GTOPO30/_unzipped/*.DEM ; do
  outname=wbgt_elev_$(basename $tile .DEM)
  MAPS=${outname},${MAPS}
  r.external input=$tile output=$outname --overwrite
done
echo "Mosaicing..."
r.patch --overwrite input=$MAPS output=wbgt_elev_mosaic --overwrite
echo "Zeroing..."
r.mapcalc expression="wbgt_elev_zeroed = isnull(wbgt_elev_mosaic) ? 0 : wbgt_elev_mosaic" --overwrite

echo "Preparing calibration..."
v.in.ogr input=${SCRIPT_DIR}/calibration.geojson output=wbgt_calibration_v --overwrite
v.to.rast input=wbgt_calibration_v type=point output=wbgt_calibration use=attr attribute_column=wbgt --overwrite
echo "Done."

calculateForRcp() {
    DAY=$DAY_START
    BANDS=""
    DELIMITER=""
    while [ $DAY -ne $DAY_MAX ]
    do    
        BANDS="${BANDS}${DELIMITER}${DAY}"
        DELIMITER=","
        DAY=$(($DAY+1))
    done
    echo "Bands: $DAY_START - $DAY_MAX"

    echo "Importing $1 data..."
    # Unzipped data from https://cds.climate.copernicus.eu/cdsapp#!/dataset/projections-cmip5-daily-single-levels?tab=form
    #Experiment:RCP 2.6Variable:2m temperature, Maximum 2m temperature in the last 24 hours, Mean sea level pressure, Near-surface specific humidityModel:IPSL-CM5A-MR (IPSL, France)Ensemble member:r1i1p1Period:20560101-21001231Format:Compressed tar file (.tar.gz)
    humidity=${INPUT_DIR}/climate/wbgt/huss_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    pressure=${INPUT_DIR}/climate/wbgt/psl_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    tempmax=${INPUT_DIR}/climate/wbgt/tasmax_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    
    #Experiment:RCP 2.6Variable:Maximum 2m temperature in the last 24 hours, Mean sea level pressure, Near-surface specific humidityModel:CSIRO-Mk3-6-0 (CSIRO, Australia)Ensemble member:r1i1p1Period:20860101-21001231Format:Compressed tar file (.tar.gz)
    #humidity=${INPUT_DIR}/climate/wbgt/huss_day_CSIRO-Mk3-6-0_${1}_r1i1p1_20860101-21001231.nc
    #pressure=${INPUT_DIR}/climate/wbgt/psl_day_CSIRO-Mk3-6-0_${1}_r1i1p1_20860101-21001231.nc
    #tempmax=${INPUT_DIR}/climate/wbgt/tasmax_day_CSIRO-Mk3-6-0_${1}_r1i1p1_20860101-21001231.nc

    #gdalinfo NETCDF:"$humidity":huss
    #exit
    echo "Humidity..."
    r.in.gdal input=$humidity output=wbgt_${1}_humidity band=$BANDS --overwrite -o -l
    echo "Pressure..."
    r.in.gdal input=$pressure output=wbgt_${1}_pressure band=$BANDS --overwrite -o -l
    echo "Tempmax..."
    r.in.gdal input=$tempmax output=wbgt_${1}_tempmax band=$BANDS --overwrite -o -l

    echo "Calculating daily WBGT..."
    DAY=$DAY_START
    BANDS=""
    DELIMITIER=""
    while [ $DAY -ne $DAY_MAX ]
    do  
        echo "WBGT day $DAY"
        # Chavaillaz, Yann, et al. "Exposure to excessive heat and impacts on labour productivity linked to cumulative CO2 emissions." Scientific reports 9.1 (2019): 1-11. https://doi.org/10.1038/s41598-019-50047-w
        P_SURF="wbgt_${1}_pressure.${DAY}*exp(10,-wbgt_elev_zeroed/(18400*wbgt_${1}_tempmax.${DAY}/273.15))"
        VP="wbgt_${1}_humidity.${DAY}*${P_SURF}/(0.622+wbgt_${1}_humidity.${DAY})"
        RESULT="wbgt_${1}_daily.${DAY}"
        r.mapcalc "${RESULT} = 0.567*(wbgt_${1}_tempmax.${DAY}-273.15)+0.393/100*${VP}+3.94" --overwrite
        BANDS="${BANDS}${DELIMITER}${RESULT}"
        DELIMITER=","
        DAY=$(($DAY+1))
    done
    echo "Calculating max WBGT for year..."
    r.series input=${BANDS} output=wbgt_${1}_max method=quantile quantile=0.99 --overwrite
    r.univar wbgt_${1}_max

    if [ "$1" == "historical" ]; then
        echo "Calibrating..."
        r.mapcalc "wbgt_calibration_delta = wbgt_calibration - wbgt_${1}_max" --overwrite
        MEAN_CALIBRATION=$(r.univar wbgt_calibration_delta -t separator=space | tail -n +2 | awk '{ print $6 }')
        echo "Calibration: $MEAN_CALIBRATION"
        r.out.gdal in=wbgt_calibration_delta output=${SCRIPT_DIR}/out/calib.tiff type=Float32 --overwrite -f -c
        r.out.png -t --overwrite input=wbgt_calibration_delta output=${SCRIPT_DIR}/out/calib.png
    fi    

    echo "Normalizing..."
    #r.mapcalc "wbgt_${1} = min(15.0, max(wbgt_${1}_max-30.0, 0.0))/15.0" --overwrite
    r.mapcalc "wbgt_${1} = min(15.0, max(wbgt_${1}_max+(${MEAN_CALIBRATION})-30.0, 0.0))/15.0" --overwrite

    echo "Done."
}

# 2005
MEAN_CALIBRATION=0
DAY_START=1461
DAY_MAX=1826
TIMESPAN=20000101-20051231
calculateForRcp "historical"

# datasets have timespan 20560101-21001231 -> 45 years -> 16425 bands -> last 365 bands are year 2100
DAY_START=16061
DAY_MAX=16426
TIMESPAN=20560101-21001231
MODEL=IPSL-CM5A-MR
calculateForRcp "rcp26"
calculateForRcp "rcp45"
calculateForRcp "rcp60"
calculateForRcp "rcp85"
