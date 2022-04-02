# For some reason, NCEP reanalysis NetCDF files are not supported in previous GDAL versions (nodata values all over the place)

# https://psl.noaa.gov/cgi-bin/db_search/DBSearch.pl?&Dataset=NCEP/DOE+AMIP-II+Reanalysis+(Reanalysis-2)+Daily+Averages&Variable=Specific+humidity
humidity=${INPUT_DIR}/climate/ncep/reanalysis/shum.2m.gauss.2005.nc
# https://psl.noaa.gov/cgi-bin/db_search/DBSearch.pl?&Dataset=NCEP/DOE+AMIP-II+Reanalysis+(Reanalysis-2)+Daily+Averages&Variable=Mean+Sea+level+pressure
pressure=${INPUT_DIR}/climate/ncep/reanalysis/slp.2005.nc
# https://psl.noaa.gov/cgi-bin/db_search/DBSearch.pl?&Dataset=NCEP/DOE+AMIP-II+Reanalysis+(Reanalysis-2)+Daily+Values&Variable=Maximum+temperature
tempmax=${INPUT_DIR}/climate/ncep/reanalysis/tmax.2m.gauss.2005.nc

docker run --rm -it -v ${INPUT_DIR}:${INPUT_DIR} osgeo/gdal:alpine-normal-3.4.2 sh -c "\
gdal_translate ${humidity} ${INPUT_DIR}/climate/wbgt/huss_day_ncep-reanalysis_historical_r1i1p1_20050101-20051231.nc && \
gdal_translate ${pressure} ${INPUT_DIR}/climate/wbgt/psl_day_ncep-reanalysis_historical_r1i1p1_20050101-20051231.nc && \
gdal_translate ${tempmax} ${INPUT_DIR}/climate/wbgt/tasmax_day_ncep-reanalysis_historical_r1i1p1_20050101-20051231.nc"