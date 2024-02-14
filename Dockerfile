FROM node:20.6.0 As development

WORKDIR /usr/src/app

COPY ./src ./src
COPY ./package*.json ./
COPY ./tsconfig*.json ./

RUN npm install

RUN npm run build
CMD [ "npm", "run", "start"]