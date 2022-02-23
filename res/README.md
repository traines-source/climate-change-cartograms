# Permutations

## CO2 - Temperature Mapping

Mapping of
* x: cumulative CO2 emissions in GtC (Carbon Gigatonnes, including sequestration) from 2010 to 2100 [2]
* y: global mean temperature rise relative to 1986-2005 mean in K (assumed to be about +1K compared to preindustrial levels) [1, p. 1444].

1 GtC equals 3.67 GtCO2.
    
Cf.
1. IPCC, 2013: Annex II: Climate System Scenario Tables [Prather, M., G. Flato, P. Friedlingstein, C. Jones, J.-F. Lamarque, H. Liao and P. Rasch (eds.)]. In: Climate Change 2013: The Physical Science Basis. Contribution of Working Group I to the Fifth Assessment Report of the Intergovernmental Panel on Climate Change [Stocker, T.F., D. Qin, G.-K. Plattner, M. Tignor, S.K. Allen, J. Boschung, A. Nauels, Y. Xia, V. Bex and P.M. Midgley (eds.)]. Cambridge University Press, Cambridge, United Kingdom and New York, NY, USA. https://www.ipcc.ch/site/assets/uploads/2017/09/WG1AR5_AnnexII_FINAL.pdf

2. Simon Dietz, Frank Venmans, Cumulative carbon emissions and economic policy: In search of general principles, Journal of Environmental Economics and ;Management, Volume 96, 2019, Pages 108-129, ISSN 0095-0696 https://doi.org/10.1016/j.jeem.2019.04.003

3. Rogelj, Joeri, et al. "Differences between carbon budget estimates unravelled." Nature Climate Change 6.3 (2016): 245-252.

4. Rogelj, J., D. Shindell, K. Jiang, S. Fifita, P. Forster, V. Ginzburg, C. Handa, H. Kheshgi, S. Kobayashi, E. Kriegler, L. Mundaca, R. Séférian, and M.V.Vilariño, 2018: Mitigation Pathways Compatible with 1.5°C in the Context of Sustainable Development. In: Global Warming of 1.5°C. An IPCC Special Report on the impacts of global warming of 1.5°C above pre-industrial levels and related global greenhouse gas emission pathways, in the context of strengthening the global response to the threat of climate change, sustainable development, and efforts to eradicate poverty [Masson-Delmotte, V., P. Zhai, H.-O. Pörtner, D. Roberts, J. Skea, P.R. Shukla, A. Pirani, W. Moufouma-Okia, C. Péan, R. Pidcock, S. Connors, J.B.R. Matthews, Y. Chen, X. Zhou, M.I. Gomis, E. Lonnoy, T. Maycock, M. Tignor, and T. Waterfield (eds.)]. In Press. https://www.ipcc.ch/site/assets/uploads/sites/2/2019/02/SR15_Chapter2_Low_Res.pdf


## Parameters - CO2 Emission Mapping

Mapping of
* x: policies and behavioral changes
* y: reduction in cumulative CO2 emissions until 2100 off of GCAM reference scenario (in between RCP8.5 and 6.0), measured in GtC.

Based on the cumulative CO2 emissions until 2100 by sector according to the GCAM reference scenario, CO2 emissions of individual sectors or groups are reduced by 80%.
Reduction of road traffic is made up of 80% reduction in CO2 emissions caused by road freight traffic and 80% reduction of short distance travel (< 10 miles) being responsible for at least 66% of total car emissions according to [4].

Cf.
1. https://github.com/JGCRI/gcam-core
2. GCAM reference scenario, see /generate/emissions/gcam_co2_emissions_by_sector.ods
2. Calvin, K., Patel, P., Clarke, L., Asrar, G., Bond-Lamberty, B., Cui, R. Y., Di Vittorio, A., Dorheim, K., Edmonds, J., Hartin, C., Hejazi, M., Horowitz, R., Iyer, G., Kyle, P., Kim, S., Link, R., McJeon, H., Smith, S. J., Snyder, A., Waldhoff, S., and Wise, M.: GCAM v5.1: representing the linkages between energy, water, land, climate, and economic systems, Geosci. Model Dev., 12, 677–698, https://doi.org/10.5194/gmd-12-677-2019, 2019.
3. https://ourworldindata.org/emissions-by-sector Accessed at 2022-02-22.
4. https://www.solarjourneyusa.com/EVdistanceAnalysis.php Accessed at 2022-02-22.



# Background Map

A composite satellite image [1] reprojected to the Hobo-Dyer cylindrical equal-area projection.

1. Stöckli, Reto, et al. "The Blue Marble Next Generation-A true color earth dataset including seasonal dynamics from MODIS." Published by the NASA Earth Observatory (2005). For image data see https://neo.gsfc.nasa.gov/archive/bluemarble/