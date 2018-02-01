from node:alpine

WORKDIR /app

COPY package.json /app
RUN npm install
COPY ./src /app

CMD node server.js