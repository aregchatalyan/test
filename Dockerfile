FROM node:alpine

WORKDIR /bothub

COPY package.json .

RUN npm install

COPY . .

CMD npm start
