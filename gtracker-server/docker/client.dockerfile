FROM node:20-alpine

ARG NODE_APP_PORT=3000
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN echo "server app port will be set to: $NODE_APP_PORT"
RUN yarn global add @angular/cli
WORKDIR /home/node/app
COPY package.json ./
COPY yarn.lock ./
USER node
RUN yarn install
COPY --chown=node:node . .
RUN sed -i "s|3000|$NODE_APP_PORT|g" ./src/environments/environment.ts
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]