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

calculateForRcpModel() {
    MODEL=$2
    SCENARIO=${1}_${2}
    TIMESPAN=$3
    DAY_START=$4
    DAY_MAX=$5

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

    echo "Importing $SCENARIO data..."
    # Unzipped data from https://cds.climate.copernicus.eu/cdsapp#!/dataset/projections-cmip5-daily-single-levels?tab=form
    #Experiment:RCP 2.6Variable:2m temperature, Maximum 2m temperature in the last 24 hours, Mean sea level pressure, Near-surface specific humidityModel:IPSL-CM5A-MR (IPSL, France)Ensemble member:r1i1p1Period:20560101-21001231Format:Compressed tar file (.tar.gz)
    humidity=${INPUT_DIR}/climate/wbgt/huss_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    pressure=${INPUT_DIR}/climate/wbgt/psl_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    tempmax=${INPUT_DIR}/climate/wbgt/tasmax_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc

    #gdalinfo NETCDF:"$humidity":huss
    #exit
    echo "Humidity..."
    r.in.gdal input=$humidity output=wbgt_${SCENARIO}_humidity band=$BANDS --overwrite -o -l
    echo "Pressure..."
    r.in.gdal input=$pressure output=wbgt_${SCENARIO}_pressure band=$BANDS --overwrite -o -l
    echo "Tempmax..."
    r.in.gdal input=$tempmax output=wbgt_${SCENARIO}_tempmax band=$BANDS --overwrite -o -l

    echo "Calculating daily WBGT..."
    DAY=$DAY_START
    BANDS=""
    DELIMITIER=""
    while [ $DAY -ne $DAY_MAX ]
    do  
        echo "WBGT day $DAY"
        # Chavaillaz, Yann, et al. "Exposure to excessive heat and impacts on labour productivity linked to cumulative CO2 emissions." Scientific reports 9.1 (2019): 1-11. https://doi.org/10.1038/s41598-019-50047-w
        # with adapted constants from Lemke, Bruno, and Tord Kjellstrom. "Calculating workplace WBGT from meteorological data: a tool for climate change assessment." Industrial Health 50.4 (2012): 267-278. https://doi.org/10.2486/indhealth.MS1352
        PRESSURE="\"wbgt_${SCENARIO}_pressure.${DAY}\""
        TEMPMAX="\"wbgt_${SCENARIO}_tempmax.${DAY}\""
        HUMIDITY="\"wbgt_${SCENARIO}_humidity.${DAY}\""
        P_SURF="${PRESSURE}*exp(10,-wbgt_elev_zeroed/(18400.0*${TEMPMAX}/273.15))"
        VP="${HUMIDITY}*${P_SURF}/(0.622+${HUMIDITY})"
        RESULT="wbgt_${SCENARIO}_daily.${DAY}"
        #r.mapcalc "\"${RESULT}\" = 0.567*(${TEMPMAX}-273.15)+0.393/100*${VP}+3.94" --overwrite
        r.mapcalc "\"${RESULT}\" = 0.567*(${TEMPMAX}-273.15)+0.216/100*${VP}+3.38" --overwrite
        BANDS="${BANDS}${DELIMITER}${RESULT}"
        DELIMITER=","
        DAY=$(($DAY+1))
    done
    echo "Calculating max WBGT for year in scenario ${SCENARIO}..."
    r.series input=${BANDS} output=wbgt_${SCENARIO}_max method=quantile quantile=0.99 --overwrite
    r.univar wbgt_${SCENARIO}_max
    #r.out.gdal in=wbgt_${SCENARIO}_max output=${SCRIPT_DIR}/out/${MODEL}.tiff type=Float32 --overwrite -f -c
    #r.out.png -t --overwrite input=wbgt_${SCENARIO}_max output=${SCRIPT_DIR}/out/${MODEL}.png
}

calculateForRcp() {
    SCENARIO=$1

    MODELS=""
    DELIMITER=""
    for M in $2; do
        MODELS="${MODELS}${DELIMITER}wbgt_${SCENARIO}_${M}_max"
        DELIMITER=","
    done

    echo "Averaging over $MODELS..."

    r.series input=${MODELS} output=wbgt_${SCENARIO}_max method=average --overwrite
    r.univar wbgt_${SCENARIO}_max

    #if [ "$1" == "historical" ]; then
    #    echo "Calibrating..."
    #    r.mapcalc "wbgt_calibration_delta = \"wbgt_historical_ncep-reanalysis_max\" - wbgt_${SCENARIO}_max" --overwrite
    #    MEAN_CALIBRATION=$(r.univar wbgt_calibration_delta -t separator=space | tail -n +2 | awk '{ print $6 }')
    #    echo "Mean Delta to NCEP: $MEAN_CALIBRATION"
    #    r.out.gdal in=wbgt_calibration output=${SCRIPT_DIR}/out/calib.tiff type=Float32 --overwrite -f -c
    #    r.out.png -t --overwrite input=wbgt_calibration output=${SCRIPT_DIR}/out/calib.png
    #fi    

    echo "Normalizing..."
    #r.mapcalc "wbgt_${SCENARIO} = min(10.0, max(wbgt_${SCENARIO}_max+wbgt_calibration_delta-35.0, 0.0))/10.0" --overwrite
    r.mapcalc "wbgt_${SCENARIO} = min(5.0, max(wbgt_${SCENARIO}_max-35.0, 0.0))/5.0" --overwrite

    echo "Done."
}

MEAN_CALIBRATION=0
MODEL_LIST="IPSL-CM5A-MR bcc-csm1-1-m"

calculateForRcpModel historical ncep-reanalysis 20050101-20051231 1 366

# 2005
calculateForRcpModel historical IPSL-CM5A-MR 20000101-20051231 1461 1826
calculateForRcpModel historical bcc-csm1-1-m 20000101-20121231 1461 1826
calculateForRcp historical "$MODEL_LIST"

# IPSL datasets have timespan 20560101-21001231 -> 45 years -> 16425 bands -> last 365 bands are year 2100
calculateForRcpModel rcp26 IPSL-CM5A-MR 20560101-21001231 16061 16426
calculateForRcpModel rcp26 bcc-csm1-1-m 20810101-21001231 6935 7300
calculateForRcp rcp26 "$MODEL_LIST"

calculateForRcpModel rcp45 IPSL-CM5A-MR 20560101-21001231 16061 16426
calculateForRcpModel rcp45 bcc-csm1-1-m 20810101-21001230 6935 7300
calculateForRcp rcp45 "$MODEL_LIST"

calculateForRcpModel rcp60 IPSL-CM5A-MR 20560101-21001231 16061 16426
calculateForRcpModel rcp60 bcc-csm1-1-m 20810101-21001230 6935 7300
calculateForRcp rcp60 "$MODEL_LIST"

calculateForRcpModel rcp85 IPSL-CM5A-MR 20560101-21001231 16061 16426
calculateForRcpModel rcp85 bcc-csm1-1-m 21000101-21001231 1 366
calculateForRcp rcp85 "$MODEL_LIST"
