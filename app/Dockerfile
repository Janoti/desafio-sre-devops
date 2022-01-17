FROM node:stretch-slim

#Create app directory
WORKDIR /usr/src/app

#Install dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
