FROM node:20.5-bookworm-slim as build
ARG TARGETARCH
ARG GITREPO=https://github.com/somsakc/nodejs-echo-api.git
RUN apt-get update && \
    apt-get install -y git && \
    git clone $GITREPO /tmp/workout && \
    cd /tmp/workout && \
    npm install && \
    ls -al

FROM node:20.5-bookworm-slim
LABEL version="1.0"
LABEL description="node.js echo api"
COPY --from=build /tmp/workout/index.js /opt/nodejs-echo-api/index.js
COPY --from=build /tmp/workout/package.json /opt/nodejs-echo-api/package.json
COPY --from=build /tmp/workout/node_modules /opt/nodejs-echo-api/node_modules
RUN chown -R node:node /opt/nodejs-echo-api && \
    chmod 755 /opt/nodejs-echo-api && \
    ls -al /opt/nodejs-echo-api

USER node:node
WORKDIR /opt/nodejs-echo-api

ENTRYPOINT ["npm", "start"]