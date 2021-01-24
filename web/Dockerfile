FROM node:latest

RUN mkdir -p /usr/app/webappcaique
WORKDIR /usr/app/webappcaique

COPY package.json /usr/app/webappcaique
COPY yarn.lock /usr/app/webappcaique

RUN yarn install

COPY . /usr/app/webappcaique

CMD ["yarn", "start"]