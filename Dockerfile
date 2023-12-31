FROM node:21.1.0
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm", "start"]
