import imageio as iio
import numpy as np

im = iio.imread('out/population2020.tiff')
max_encountered_density = 30000

print(im)
print(im.shape)

f = im.flatten()
print(f.shape)
earthskm = 510000000
skmperpx = earthskm/f.shape[0]
print(skmperpx)
summed = np.sum(f)
summed_scaled = summed/1.0*max_encountered_density
print(summed, summed_scaled, summed_scaled/f.shape[0], np.min(f), np.max(f))
print("Population estimate:", summed_scaled*skmperpx)