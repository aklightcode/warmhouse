FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

HEALTHCHECK --interval=20s --timeout=10s --start-period=5s --retries=5 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8081/health || exit 1

CMD ["npm", "start"]