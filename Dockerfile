FROM node:14

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY prisma ./prisma/
COPY scripts ./scripts/
COPY src ./src/

RUN npm install
RUN npm run build

CMD node ./dist/app.js