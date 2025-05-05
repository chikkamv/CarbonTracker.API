# Build the frontend with Node.js
FROM node:16 AS build

WORKDIR /app
COPY carbon-tracker-ui/package*.json ./

# Install dependencies
RUN npm install

COPY carbon-tracker-ui/ ./
RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY carbon-tracker-ui/nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
