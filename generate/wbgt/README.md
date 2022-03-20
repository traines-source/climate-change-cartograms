# Wet-Bulb Globe Temperature

Mapping of the RCP scenarios to projected 0.99 quantile of maximum wet-bulb globe temperature in the year 2100. I.e. three days in 2100 will have a higher WBGT. The data is normalized to a 0-1 scale over all RCP scenarios, with 0 corresponding to a WBGT of 30 and lower (30 implies starting health and productivity impacts) and 1 corresponding to a WBGT of 45 and higher (35 is the theoretical limit for human tolerance [1]).

Projections are based on the IPSL-CM5A-MR CMIP5 model [2] and calculated at daily intervals from the maximum 2m temperature in the last 24 hours, mean sea level pressure, near-surface specific humidity and elevation [3] according to a simplified WBGT formula [4, 5]. 0.99 quantiles for the year 2100 are calculated from these daily values. For the baseline, 2005 projections of the same model are used.

Compared to [1] and [6], our WBGTs seem to be slightly overestimated. They have calculated means over multiple CMIP5 models, while we only used a single model. However, according to [7], WBGTs occasionally have reached 35 already today. Anyways, for the uses of the cartogram, relative correctness (regional and in between RCP scenarios) is most important.

1. Coffel, Ethan D., Radley M. Horton, and Alex De Sherbinin. "Temperature and humidity based projections of a rapid rise in global heat stress exposure during the 21st century." Environmental Research Letters 13.1 (2017): 014001. 
2. Dufresne, J-L., et al. "Climate change projections using the IPSL-CM5 Earth System Model: from CMIP3 to CMIP5." Climate dynamics 40.9 (2013): 2123-2165. Obtained from https://cds.climate.copernicus.eu/cdsapp#!/dataset/projections-cmip5-daily-single-levels?tab=form
3. GTOPO30 http://www.webgis.com/terr_world.html Worldwide DEM. U.S. Geological Survey (USGS). Public Domain.
4. Chavaillaz, Yann, et al. "Exposure to excessive heat and impacts on labour productivity linked to cumulative CO2 emissions." Scientific reports 9.1 (2019): 1-11.
5. Buzan, J. R., K. Oleson, and M. Huber. "Implementation and comparison of a suite of heat stress metrics within the Community Land Model version 4.5." Geoscientific Model Development 8.2 (2015): 151-170.
6. Newth, David, and Don Gunasekera. "Projected changes in wet-bulb globe temperature under alternative climate scenarios." Atmosphere 9.5 (2018): 187.
7. Raymond, Colin, Tom Matthews, and Radley M. Horton. "The emergence of heat and humidity too severe for human tolerance." Science Advances 6.19 (2020): eaaw1838.
