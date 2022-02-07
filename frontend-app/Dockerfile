# Build the React frontend-app
FROM node:16.6.1 as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
CMD ["npm", "start"]
