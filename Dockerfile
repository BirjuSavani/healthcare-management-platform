FROM node:22.12-alpine

WORKDIR /usr/src/app

COPY . .

RUN apk add --no-cache bash

RUN npm install 

RUN npm run build

CMD ["npm", "start"]