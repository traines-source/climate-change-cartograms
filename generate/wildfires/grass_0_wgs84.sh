#!/bin/bash
set -e

#r.mask -r
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

updKBDI() {
    PNET="max(0, ${PRECIPITATION}*86400-(${DAYS_SINCE_RAIN} > 0 ? 5.08 : 0))"
    DQ="(203.2-(${LAST_KBDI}))*0.968*(exp(0.0875*(${TEMPMAX}-273.15)+1.5552)-8.3)/(1+10.88*exp(-0.001736*${ANNUAL_PRECIPITATION}*86400))/pow(10,3)"
    r.mapcalc "${LAST_KBDI} = max(0, ${LAST_KBDI}+${DQ}-${PNET})" --overwrite
    r.mapcalc "${DAYS_SINCE_RAIN} = ${PRECIPITATION}*86400 < ${PRECIPITATION_THRESH} ? ${DAYS_SINCE_RAIN}+1 : 0" --overwrite  
}
initKBDI() {
    DAY=$DAY_START
    while [ $DAY -ne $DAY_MAX ]
    do
        TEMPMAX="\"wbgt_${SCENARIO}_tempmax.${DAY}\""
        PRECIPITATION="\"wf_${SCENARIO}_precipitation.${DAY}\""
        updKBDI
        DAY=$(($DAY+1))
    done
}

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
    relhum=${INPUT_DIR}/climate/wbgt/rhs_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    humidity=${INPUT_DIR}/climate/wbgt/huss_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    wind=${INPUT_DIR}/climate/wbgt/sfcWind_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    pressure=${INPUT_DIR}/climate/wbgt/psl_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    tempmax=${INPUT_DIR}/climate/wbgt/tasmax_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    temp=${INPUT_DIR}/climate/wbgt/tas_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc
    precipitation=${INPUT_DIR}/climate/wbgt/pr_day_${MODEL}_${1}_r1i1p1_${TIMESPAN}.nc

    #gdalinfo NETCDF:"$humidity":huss
    #exit
    echo "Specific Humidity..."
    r.in.gdal input=$humidity output=wbgt_${SCENARIO}_humidity band=$BANDS --overwrite -o -l
    echo "Pressure..."
    r.in.gdal input=$pressure output=wbgt_${SCENARIO}_pressure band=$BANDS --overwrite -o -l
    echo "Tempmax..."
    r.in.gdal input=$tempmax output=wbgt_${SCENARIO}_tempmax band=$BANDS --overwrite -o -l
    #echo "Rel Humidity..."
    #r.in.gdal input=$relhum output=wf_${SCENARIO}_relhum band=$BANDS --overwrite -o -l
    echo "Wind..."
    r.in.gdal input=$wind output=wf_${SCENARIO}_wind band=$BANDS --overwrite -o -l
    echo "Precipitation..."
    r.in.gdal input=$precipitation output=wf_${SCENARIO}_precipitation band=$BANDS --overwrite -o -l
    echo "Temp..."
    r.in.gdal input=$temp output=wf_${SCENARIO}_temp band=$BANDS --overwrite -o -l

    echo "Initalizing variables..."
    DAY=$DAY_START
    BANDS=""
    DELIMITER=""
    while [ $DAY -ne $DAY_MAX ]
    do    
        BANDS="${BANDS}${DELIMITER}wf_${SCENARIO}_precipitation.${DAY}"
        DELIMITER=","
        DAY=$(($DAY+1))
    done
    r.series input=${BANDS} output=wf_${SCENARIO}_precipitation_annual method=sum --overwrite
    ANNUAL_PRECIPITATION="\"wf_${SCENARIO}_precipitation_annual\""
    r.univar wf_${SCENARIO}_precipitation_annual

    LAST_KBDI="\"wf_${SCENARIO}_kbdi\""
    DAYS_SINCE_RAIN="\"wf_${SCENARIO}_dsrain\""
    PRECIPITATION_THRESH=0.01
    r.mapcalc "${LAST_KBDI} = 100" --overwrite
    r.mapcalc "${DAYS_SINCE_RAIN} = 5" --overwrite
    
    initKBDI
    r.univar wf_${SCENARIO}_kbdi

    echo "Calculating daily WFs..."
    DAY=$DAY_START
    BANDS=""
    DELIMITIER=""    
    while [ $DAY -ne $DAY_MAX ]
    do  
        echo "WF day $DAY"
        HUMIDITY="\"wbgt_${SCENARIO}_humidity.${DAY}\"" 
        PRESSURE="\"wbgt_${SCENARIO}_pressure.${DAY}\"" #Pa
        TEMPMAX="\"wbgt_${SCENARIO}_tempmax.${DAY}\"" #K
        #RELHUM="\"wf_${SCENARIO}_relhum.${DAY}\""
        WIND="\"wf_${SCENARIO}_wind.${DAY}\"" #m/s
        PRECIPITATION="\"wf_${SCENARIO}_precipitation.${DAY}\"" #mm/s
        TEMP="\"wf_${SCENARIO}_temp.${DAY}\"" #K

        # FFDI base: Sun, Qiaohong, et al. "Global heat stress on health, wildfires, and agricultural crops under different levels of climate warming." Environment international 128 (2019): 125-136. https://doi.org/10.1016/j.envint.2019.04.025
        # SI KBDI formula: Garcia-Prats, Alberto, Fernandes JG Tarcísio, and Molina J. Antonio. "Development of a Keetch and Byram—based drought index sensitive to forest management in Mediterranean conditions." Agricultural and Forest Meteorology 205 (2015): 40-50. http://dx.doi.org/10.1016/j.agrformet.2015.02.009
        # burnability: Gannon, Colin S., and Nik C. Steinberg. "A global assessment of wildfire potential under climate change utilizing Keetch-Byram drought index and land cover classifications." Environmental Research Communications 3.3 (2021): 035002. https://doi.org/10.1088/2515-7620/abd836
        # P_SURF: Chavaillaz, Yann, et al. "Exposure to excessive heat and impacts on labour productivity linked to cumulative CO2 emissions." Scientific reports 9.1 (2019): 1-11. https://doi.org/10.1038/s41598-019-50047-w

        P_SURF="${PRESSURE}*exp(10,-wbgt_elev_zeroed/(18400.0*${TEMPMAX}/273.15))" #Pa
        #P_SURF="${PRESSURE}*pow(1-0.0065*wbgt_elev_zeroed/(${TEMP}+0.0065*wbgt_elev_zeroed), 5.257)"
        # https://earthscience.stackexchange.com/questions/2360/how-do-i-convert-specific-humidity-to-relative-humidity
        REL_HUM="min(100, max(0, 0.263*${P_SURF}*${HUMIDITY}/exp((17.67*(${TEMP}-273.15))/(${TEMP}-29.65))))" 

        #RELHUM_APPROX="wf_${SCENARIO}_relhum_approx"
        #r.mapcalc "\"${RELHUM_APPROX}\" = $REL_HUM-${RELHUM}" --overwrite
        #r.univar wf_${SCENARIO}_relhum.${DAY}
        #r.univar $RELHUM_APPROX

        updKBDI
        #DF="0.191*(${LAST_KBDI}+104)*pow(${DAYS_SINCE_RAIN}+1, 1.5)/(3.52*pow(${DAYS_SINCE_RAIN}+1, 1.5)+${PRECIPITATION}*86400-1)"
        #FFDI="2.0*exp(-0.450+0.987*log(${DF})-0.0345*${REL_HUM}+0.0338*(${TEMPMAX}-273.15)+0.0234*${WIND}*3.6)"

        RESULT="wf_${SCENARIO}_daily.${DAY}"
        #r.mapcalc "\"${RESULT}\" = ${FFDI}" --overwrite
        r.mapcalc "\"${RESULT}\" = ${LAST_KBDI}" --overwrite

        BANDS="${BANDS}${DELIMITER}${RESULT}"
        DELIMITER=","
        DAY=$(($DAY+1))
    done
    echo "Calculating WF for year in scenario ${SCENARIO}..."
    r.series input=${BANDS} output=wf_${SCENARIO}_avg method=average range=0,inf --overwrite
}

calculateForRcp() {
    SCENARIO=$1

    MODELS=""
    DELIMITER=""
    for M in $2; do
        MODELS="${MODELS}${DELIMITER}wf_${SCENARIO}_${M}_avg"
        DELIMITER=","
    done

    echo "Averaging over $MODELS..."

    r.series input=${MODELS} output=wf_${SCENARIO}_avg method=average --overwrite
    r.univar wf_${SCENARIO}_avg

    echo "Normalizing..."
    r.mapcalc "wf_${SCENARIO} = min(200.0, max(wf_${SCENARIO}_avg, 0.0))/200.0" --overwrite
    echo "Done."
}

MEAN_CALIBRATION=0
MODEL_LIST="IPSL-CM5A-MR"

#calculateForRcpModel historical ncep-reanalysis 20050101-20051231 1 366

# 2005
calculateForRcpModel historical IPSL-CM5A-MR 20000101-20051231 1461 1826
calculateForRcp historical "$MODEL_LIST"

# IPSL datasets have timespan 20560101-21001231 -> 45 years -> 16425 bands -> last 365 bands are year 2100
calculateForRcpModel rcp26 IPSL-CM5A-MR 20560101-21001231 16061 16426
calculateForRcp rcp26 "$MODEL_LIST"

calculateForRcpModel rcp45 IPSL-CM5A-MR 20560101-21001231 16061 16426
calculateForRcp rcp45 "$MODEL_LIST"

calculateForRcpModel rcp60 IPSL-CM5A-MR 20560101-21001231 16061 16426
calculateForRcp rcp60 "$MODEL_LIST"

calculateForRcpModel rcp85 IPSL-CM5A-MR 20560101-21001231 16061 16426
calculateForRcp rcp85 "$MODEL_LIST"
