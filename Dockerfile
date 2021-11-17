FROM node:16-alpine

ENV YARN_VERSION 1.13.0
ENV PROJECT_DIRECTORY /home/node/app

RUN mkdir -p "$PROJECT_DIRECTORY/node_modules" && chown -R node:node $PROJECT_DIRECTORY

WORKDIR $PROJECT_DIRECTORY

USER node

COPY --chown=node:node package.json $PROJECT_DIRECTORY
COPY --chown=node:node yarn.lock $PROJECT_DIRECTORY


RUN yarn

COPY --chown=node:node . $PROJECT_DIRECTORY

CMD [ "node" ]
