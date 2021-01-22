FROM node:latest

RUN mkdir -p /usr/app/web
WORKDIR /usr/app/web

COPY package.json /usr/app/web
COPY yarn.lock /usr/app/web

RUN yarn install

COPY . /usr/app/web

CMD ["yarn", "start"]