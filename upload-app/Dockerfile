# Base
FROM node:20.11-alpine AS base

WORKDIR /app/

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

# Builder
FROM base as builder

RUN npm run build

# Final
FROM nginx:1.25.3-alpine as final

COPY --from=builder /app/build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
