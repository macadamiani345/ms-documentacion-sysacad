FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package*.json ./

RUN npm install
RUN npm ci --unsafe-perm=false --no-audit --no-fund

COPY tsconfig.json ./
COPY public ./public
COPY src ./src
 
RUN npm run build

COPY src/views ./dist/views

RUN npm ci --only=production --no-audit --no-fund && \
    rm -rf src tsconfig.json


ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

CMD ["dist/index.js"]