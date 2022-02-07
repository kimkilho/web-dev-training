# Build the React frontend-app
FROM node:16.6.1 as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install
RUN npm run build

# Build a Caddy container
FROM caddy:alpine
EXPOSE 80
EXPOSE 443
COPY --from=build-step /app/build /usr/share/caddy
