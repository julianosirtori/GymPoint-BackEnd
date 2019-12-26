FROM node:10.13-alpine
ENV NODE_ENV development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run-script build

CMD ["node", "dist/server.js"]