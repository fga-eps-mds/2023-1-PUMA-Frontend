FROM node:14-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG IP_ARG

ENV VUE_APP_IP_ADDRESS ${IP_ARG}

ARG env

ENV VUE_APP_ENVIRONMENT ${env}

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN cat /etc/nginx/conf.d/default.conf

EXPOSE 80

ARG IP_ARG

ENV VUE_APP_IP_ADDRESS ${IP_ARG}

ARG env

ENV VUE_APP_ENVIRONMENT ${env}
CMD ["nginx", "-g", "daemon off;"]
