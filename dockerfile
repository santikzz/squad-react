FROM node:21-alpine3.18

WORKDIR /react

COPY public/ /react/public
COPY src/ /react/src
COPY package.json /react/

RUN npm install

CMD ["npm", "run", "serve", "--", "--host", "--port", "4173"]