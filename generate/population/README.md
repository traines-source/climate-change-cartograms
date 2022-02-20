# Population Density

The population density grid from [1] is reprojected to the Hobo-Dyer cylindrical equal-area projection. Very high densities (above 30000 per km^2) are clipped and the densities are normalized to a 0-1 scale.

Population densities for the year 2100 are projected from the 2020 levels by adjusting grid values by a constant factor determined on a per-country basis. The per-country population increase/decrease factor until 2100 is derived from [3] (UN medium variant scenario) and applied to country extents according to [2]. This is a simplification that ignores impacts like urbanization, climate change and domestic push and pull factors and is thus not suitable for more in-depth investigation.

Apparently due to rounding/resampling imprecision during reprojection, total population counts are in both cases slightly overestimated (ca. 5%). For individual countries, deviations occur in both directions (see proj_errors.png). For more precise data, rescaling according to country totals after the projection might be necessary.


1. Center for International Earth Science Information Network - CIESIN - Columbia University. 2018. Gridded Population of the World, Version 4 (GPWv4): Population Density Adjusted to Match 2015 Revision UN WPP Country Totals, Revision 11. Palisades, NY: NASA Socioeconomic Data and Applications Center (SEDAC). https://doi.org/10.7927/H4F47M65. Accessed 2022-02-19. Data licensed under CC-BY-4.0 http://creativecommons.org/licenses/by/4.0.
2. Center for International Earth Science Information Network - CIESIN - Columbia University. 2018. Gridded Population of the World, Version 4 (GPWv4): National Identifier Grid, Revision 11. Palisades, NY: NASA Socioeconomic Data and Applications Center (SEDAC). https://doi.org/10.7927/H4TD9VDP. Accessed 2022-02-19. Data licensed under CC-BY-4.0 http://creativecommons.org/licenses/by/4.0.
3. https://ourworldindata.org/grapher/population-past-future, Gapminder (v6), HYDE (v3.2), United Nations Population Division (2019). Accessed 2022-02-19. Data licensed under CC-BY-4.0 http://creativecommons.org/licenses/by/4.0