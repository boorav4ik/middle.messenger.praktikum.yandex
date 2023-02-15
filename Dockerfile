FROM node:16-alpine AS builder

WORKDIR /var/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:16-alpine AS production

WORKDIR /var/production

COPY --from=builder /var/app/package.json /var/app/package-lock.json ./

RUN npm i --omit=dev --ignore-scripts

COPY --from=builder /var/app/dist ./dist
COPY --from=builder /var/app/server.js ./

EXPOSE 3000

CMD ["node", "./server.js"]
