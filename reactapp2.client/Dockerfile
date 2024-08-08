FROM node:alpine as jsbuild
WORKDIR /app
COPY ./reactapp2.client/package*.json ./
COPY ./reactapp2.client ./
RUN npm install
CMD ["npm", "run", "dev"]