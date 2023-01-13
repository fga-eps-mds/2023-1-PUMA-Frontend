FROM node:lts-alpine

WORKDIR /app

ENV ENVIRONMENT=dev

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install --silent

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve"]
