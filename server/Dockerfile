FROM node:latest

RUN mkdir -p /usr/app/server
WORKDIR /usr/app/server

COPY package.json /usr/app/server
COPY yarn.lock /usr/app/server

RUN yarn install

COPY . /usr/app/server

CMD ["yarn", "start"]