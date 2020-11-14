FROM node:12 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .
RUN npm i rimraf
RUN npm run build

FROM node:12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

#EXPOSE 3000
CMD ["node", "dist/main"]
