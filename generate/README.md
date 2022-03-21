# Generating the Cartogram Data

This directory contains source data and algorithms to prepare the cartograms. The TIFF files in the out/ directories of the metrics and impacts are all projected using the Hobo-Dyer cylindrical equal-area projection [1], with pixel values on a continuous scale between 0 and 1. As such, they are not viewable with normal image viewers. The PNG files next to them are provided for quick visualization of the underlying data, by discretizing the pixel values to a scale of 0-255.

The "densities" from the TIFF files are then merged in all permutations of metrics, impacts, parameters and time. Using the algorithm from [2], the coordinate displacements for the cartograms are precalculated for all permutations, so that later, for a given permutation, the map can be appropriately distorted based on the precalculated coordinates.

## Metrics

* [Population](population/)

## Impacts

* [Sealevel rising](sealevel/)
* [Wet-Bulb Globe Temperature](wbgt/)
* [Wildfires](wildfires/)

## Other supporting data

* [Base map with world cities](map/)
* [CO2 emissions data for parameters](emissions/)

1. Hobo-Dyer proj4 string: `+proj=cea +lon_0=0 +lat_ts=37.5 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs`
2. Gastner, Michael T., and Mark EJ Newman. "Diffusion-based method for producing density-equalizing maps." Proceedings of the National Academy of Sciences 101.20 (2004): 7499-7504. Also see http://www-personal.umich.edu/~mejn/cart/
