FROM mundialis/grass-py3-pdal:8.0.0-debian

# see http://www-personal.umich.edu/~mejn/cart/
RUN wget -O /tmp/cart.tgz http://www-personal.umich.edu/~mejn/cart/download/cart-1.2.2.tgz

RUN apt-get update && apt-get install -y imagemagick fftw3-dev

RUN tar -xzf /tmp/cart.tgz -C /tmp/ && cd /tmp/cart*/ && gcc -O -o cart cart.c main.c -lfftw3 -lm && cp cart /usr/local/bin/

RUN pip3 install --upgrade pip
RUN pip3 install --no-input imageio scipy

RUN apt-get install -y gdal-bin libgdal-dev proj-bin
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
RUN pip3 install --no-input GDAL==2.4.0 pyproj
RUN pip3 install --no-input opencv-python && apt-get install ffmpeg libsm6 libxext6  -y
RUN pip3 install --no-input geopandas shapely pygeos jinja2 babel markdown

RUN \
    sed -i 's#<policy domain="resource" name="memory" value="256MiB"/>#<policy domain="resource" name="memory" value="4GiB"/#g' /etc/ImageMagick-6/policy.xml && \
    sed -i 's#<policy domain="resource" name="map" value="512MiB"/>#<policy domain="resource" name="map" value="8GiB"/>#g' /etc/ImageMagick-6/policy.xml && \
    sed -i 's#<policy domain="resource" name="width" value="16KP"/>#<policy domain="resource" name="width" value="128KP"/>#g' /etc/ImageMagick-6/policy.xml && \
    sed -i 's#<policy domain="resource" name="height" value="16KP"/>#<policy domain="resource" name="height" value="128KP"/>#g' /etc/ImageMagick-6/policy.xml && \
    sed -i 's#<policy domain="resource" name="area" value="126MB"/>#<policy domain="resource" name="area" value="2GB"/>#g' /etc/ImageMagick-6/policy.xml && \
    sed -i 's#<policy domain="resource" name="disk" value="1GiB"/>#<policy domain="resource" name="disk" value="16GiB"/>#g' /etc/ImageMagick-6/policy.xml