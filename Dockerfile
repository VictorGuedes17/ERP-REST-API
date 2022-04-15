FROM node:14.17.3-alpine3.11
LABEL maintainer="ERPRestAPI"

ENV NODE_ENV=development
ENV APP_ROOT /home/app/
ENV PORT 3003

RUN adduser -h ${APP_ROOT} -D app
USER root

WORKDIR ${APP_ROOT}
COPY package* ${APP_ROOT}
COPY yarn* ${APP_ROOT}
COPY prisma ${APP_ROOT}prisma/

RUN yarn

RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . ${APP_ROOT}
EXPOSE ${PORT}

CMD [ "node", "build/server.js" ]
