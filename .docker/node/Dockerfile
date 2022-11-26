FROM node:alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

USER node

WORKDIR /app

CMD ["sh", "-c", "tail -f /dev/null"]