# syntax=docker/dockerfile:1
FROM node:18.15-alpine
#Install the node packages first
COPY ./backend/package.json .
RUN npm install
#Copy over all the source code
COPY ./backend .
CMD ["npm", "start"]
