
FROM node:22-alpine AS builder

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    git \
    && rm -rf /var/cache/apk/*

WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package*.json ./


RUN npm ci --unsafe-perm=false --no-audit --no-fund

COPY tsconfig.json ./
COPY public ./public
COPY src ./src
 
RUN npm run build

FROM node:22-alpine

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

RUN addgroup -g 1001 nodeapp && adduser -S -G nodeapp -u 1001 nodeapp

WORKDIR /app

COPY --chown=nodeapp:nodeapp --from=builder /app/package*.json ./
COPY --chown=nodeapp:nodeapp --from=builder /app/node_modules ./node_modules
COPY --chown=nodeapp:nodeapp --from=builder /app/dist ./dist
COPY --chown=nodeapp:nodeapp --from=builder /app/public ./public
COPY --chown=nodeapp:nodeapp --from=builder /app/src/views ./dist/views

USER nodeapp


ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

CMD ["node", "dist/index.js"]