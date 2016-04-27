FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app/public/
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install express

COPY ./public/ /usr/src/app/public/
COPY server.js /usr/src/app/
EXPOSE 8080

CMD [ "npm", "run", "server" ]
