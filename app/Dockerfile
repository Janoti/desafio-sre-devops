FROM node:current-alpine3.14

#Create app directory
WORKDIR /usr/src/app

#Install dependencies
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]
