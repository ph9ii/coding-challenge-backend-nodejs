FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY ./package.json .

# npm install
RUN apt-get update && npm install

# expose  api port and debug port
EXPOSE 3000 9229

CMD [ "npm", "run", "start" ]