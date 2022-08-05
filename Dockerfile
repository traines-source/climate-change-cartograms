FROM nginx

COPY dist/ /usr/share/nginx/html/dist/
COPY dist/www/ /usr/share/nginx/html/
RUN rm -r /usr/share/nginx/html/dist/www/

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

COPY res/ /usr/share/nginx/html/res/