FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY ./ .
RUN pnpm run build

FROM registry.cn-hangzhou.aliyuncs.com/dockerhub_mirror/nginx
VOLUME /tmp
ENV LANG=en_US.UTF-8
RUN echo "server {  \
                      listen       80; \
                      location   /jeecgboot/ { \
                      proxy_pass              http://jeecg-boot-system:8080/jeecg-boot/; \
                      proxy_redirect          off; \
                      proxy_set_header        Host jeecg-boot-system; \
                      proxy_set_header        X-Real-IP \$remote_addr; \
                      proxy_set_header        X-Forwarded-For \$proxy_add_x_forwarded_for; \
                  } \
                  # Giải quyết vấn đề không tìm thấy trang khi làm mới địa chỉ đường dẫn trong chế độ Router(mode: 'history') \
                  location / { \
                     root   /var/www/html/; \
                      index  index.html index.htm; \
                      if (!-e \$request_filename) { \
                          rewrite ^(.*)\$ /index.html?s=\$1 last; \
                          break; \
                      } \
                  } \
                  access_log  /var/log/nginx/access.log ; \
              } " > /etc/nginx/conf.d/default.conf \
    &&  mkdir  -p  /var/www \
    &&  mkdir -p /var/www/html

COPY --from=build /app/dist/ /var/www/html/
EXPOSE 80
EXPOSE 443
