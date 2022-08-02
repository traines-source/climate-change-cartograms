# Wildfire Risk

Mapping of the RCP scenarios to wildfire risk.

Projections are based on the IPSL-CM5A-MR [1] CMIP5 model. We use the approach and the burnability factor data from [2]. For details on the used Keetch–Byram drought index (KBDI) formula, see [5]. The KBDI is calculated based on daily values for maximum 2m temperature in the last 24 hours and precipitation from the CMIP5 model for the individual RCP scenarios.
The daily values with a value above 100 (i.e. a high wildfire risk, corresponds to 400 in the American version of the KBDI) are counted for the year 2100 (or 2005, for the baseline) and multiplied with the burnability factor. The KBDI is initialized by using the respective year as a run-up period before starting the actual projections for that year. This appears to sufficiently stabilize the KBDI.

The KBDI in conjunction with the burnability factor is still only an estimate of wildfire risk, not of actual wildfire occurence. The McArthur Forest Fire Danger Index (FFDI) [3] on top of the KBDI might be more meaningful, as in [4]. The burnability factor stays constant over all scenarios, thus not taking into account possible alterations of vegetation etc. (cf. [2]).

1. Dufresne, J-L., et al. "Climate change projections using the IPSL-CM5 Earth System Model: from CMIP3 to CMIP5." Climate dynamics 40.9 (2013): 2123-2165. https://cmc.ipsl.fr/ipsl-climate-models/ipsl-cm5/. Obtained from https://cds.climate.copernicus.eu/cdsapp#!/dataset/projections-cmip5-daily-single-levels?tab=form
2. Gannon, Colin S., and Nik C. Steinberg. "A global assessment of wildfire potential under climate change utilizing Keetch-Byram drought index and land cover classifications." Environmental Research Communications 3.3 (2021): 035002. https://doi.org/10.1088/2515-7620/abd836
3. Noble, I. R., A. M. Gill, and G. A. V. Bary. "McArthur's fire‐danger meters expressed as equations." Australian Journal of Ecology 5.2 (1980): 201-203. <https://doi.org/10.1111/j.1442-9993.1980.tb01243.x>
4. Sun, Qiaohong, et al. "Global heat stress on health, wildfires, and agricultural crops under different levels of climate warming." Environment international 128 (2019): 125-136. https://doi.org/10.1016/j.envint.2019.04.025
5. Garcia-Prats, Alberto, Fernandes JG Tarcísio, and Molina J. Antonio. "Development of a Keetch and Byram—based drought index sensitive to forest management in Mediterranean conditions." Agricultural and Forest Meteorology 205 (2015): 40-50. http://dx.doi.org/10.1016/j.agrformet.2015.02.009