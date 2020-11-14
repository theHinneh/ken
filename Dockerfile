FROM node:12
WORKDIR /backend
COPY package.json /backend
RUN npm install
COPY . /backend
EXPOSE 3000
CMD ["npm", "start"]
