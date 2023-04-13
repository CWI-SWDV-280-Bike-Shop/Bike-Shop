# syntax=docker/dockerfile:1
FROM node:18.15-alpine
#Install the node packages first
COPY package*.json ./
RUN npm install
#Copy over all the source code
COPY . .
CMD ["npm", "start"]
