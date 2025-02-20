FROM node:18

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY /db ./db

RUN npm install 

COPY /app.ts ./

RUN npm install -g typescript
RUN tsc

EXPOSE 3000

CMD ["node", "./dist/app.js"]