# Build
FROM node:16-alpine AS builder

WORKDIR /usr/app
COPY . .

WORKDIR /usr/app/webpack
RUN yarn install --immutable --immutable-cache --check-cache --production=false

RUN yarn run prod

# Cleanup
RUN rm -rf /usr/app/webpack

# Run
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app /usr/share/nginx/html