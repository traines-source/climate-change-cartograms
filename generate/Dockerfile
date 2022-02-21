FROM mundialis/grass-py3-pdal:8.0.0-debian

RUN apt-get update && apt-get install -y imagemagick

RUN pip3 install --upgrade pip
RUN pip3 install --no-input imageio scipy

RUN apt-get install -y gdal-bin libgdal-dev proj-bin
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
RUN pip3 install --no-input GDAL==2.4.0 pyproj
