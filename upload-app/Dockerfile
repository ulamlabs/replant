# Base
FROM --platform=linux/amd64 node:20.11-alpine AS base

WORKDIR /app/

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

# Builder
FROM base as builder

RUN npm run build

# Final
FROM --platform=linux/amd64 nginx:1.25.3-alpine as final

COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
