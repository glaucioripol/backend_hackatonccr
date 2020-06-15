FROM node:12

WORKDIR /api

COPY --chown=node:node . .

RUN ls -lha

RUN yarn

EXPOSE 3333

CMD [ "yarn", "start" ]
