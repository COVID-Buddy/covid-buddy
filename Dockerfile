FROM nginx:mainline-alpine

COPY ngx/conf.conf /etc/nginx/nginx.conf
COPY ngx/cert.crt /etc/ssl/certs/nginx.crt
COPY ngx/cert.key /etc/ssl/certs/nginx.key
COPY dist/sg-health/ /usr/share/nginx/html

EXPOSE 443
EXPOSE 80