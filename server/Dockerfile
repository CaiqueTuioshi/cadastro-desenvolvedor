FROM node:latest

RUN mkdir -p /usr/app/serverappcaique
WORKDIR /usr/app/serverappcaique

COPY package.json /usr/app/serverappcaique
COPY yarn.lock /usr/app/serverappcaique

RUN yarn install

COPY . /usr/app/serverappcaique

CMD ["yarn", "start"]