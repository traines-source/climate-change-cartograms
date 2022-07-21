import pyproj
import math
import json

class Proj:    
    def __init__(self, proj4str, width):
        self.width = width
        self.scale = 1
        self.dx = 0
        self.dy = 0

        proj_from = pyproj.CRS.from_epsg(4326)
        proj_to = pyproj.CRS.from_proj4(proj4str)
        self.transformer = pyproj.Transformer.from_crs(proj_from, proj_to, always_xy=True)
        self.reverse_transformer = pyproj.Transformer.from_crs(proj_to, proj_from, always_xy=True)

        self.scale = width/(self.transform((180, 0))[0]*2)
        self.dx = self.transform((-180, 0))[0]
        self.dy = self.transform((0, 90))[1]
        self.height = math.floor(self.transform((0, -90))[1])

    def transform(self, lonlat):
        coord = self.unscaled_transform(lonlat)
        return (coord[0]*self.scale-self.dx, -coord[1]*self.scale-self.dy)

    def unscaled_transform(self, lonlat):
        return self.transformer.transform(lonlat[0], lonlat[1])
    
    def reverse_transform(self, xy):
        coord = self.reverse_transformer.transform((xy[0]+self.dx)/self.scale, -(xy[1]+self.dy)/self.scale)
        return (round(coord[0], 3), round(coord[1], 3))

    def sample_grid(self, sample_lambda):
        grid = []
        
        for y in range(floor(self.height)):
            row = []
            for x in range(self.width):
                row.append(sample_lambda(self.reverse_transform((x, y))))
            grid.append(row)

        return grid
    
    def __iter__(self):
        self.i = 0
        return self

    def __next__(self):
        if self.i < floor(self.height)*self.width:
            c = self.reverse_transform((self.i%self.width, self.i//self.width))
            self.i += 1
            return c
        else:
            raise StopIteration

class HoboDyerProj(Proj):
    proj4 = "+proj=cea +lon_0=0 +lat_ts=37.5 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"

    def __init__(self, width=200):
        super().__init__(HoboDyerProj.proj4, width)

class HammerProj(Proj):
    proj4 = "+proj=hammer"

    def __init__(self):
        super().__init__(HammerProj.proj4, 1510)


def write_json(filename, data):
    with open(filename, 'w') as f:
        json.dump(data, f)

def read_json(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def geo_dist(a, b):
    R = 6371
    psi1 = a[1] * math.pi/180;
    psi2 = b[1] * math.pi/180;
    dpsi = (b[1]-a[1]) * math.pi/180;
    dlambda = (b[0]-a[0]) * math.pi/180;

    a = math.sin(dpsi/2) * math.sin(dpsi/2) + math.cos(psi1) * math.cos(psi2) * math.sin(dlambda/2) * math.sin(dlambda/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

    return R * c


