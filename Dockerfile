FROM node:22-bookworm-slim as build
ARG TARGETARCH
ARG GITREPO=https://github.com/somsakc/nodejs-echo-api.git
RUN apt-get update && \
    apt-get install -y git && \
    git clone $GITREPO /tmp/workout && \
    cd /tmp/workout && \
    npm install && \
    ls -al

FROM node:22-bookworm-slim
LABEL org.opencontainers.image.title="nodejs-echo-api"
LABEL org.opencontainers.image.description="node.js echo api"
LABEL org.opencontainers.image.source="https://github.com/somsakc/nodejs-echo-api"
LABEL org.opencontainers.image.author="Somsak Chartsrisak <somsakc@hotmail.com>"
LABEL org.opencontainers.image.license="MIT"
LABEL org.opencontainers.image.version="1.0.0"
COPY --from=build /tmp/workout/index.js /opt/nodejs-echo-api/index.js
COPY --from=build /tmp/workout/package.json /opt/nodejs-echo-api/package.json
COPY --from=build /tmp/workout/node_modules /opt/nodejs-echo-api/node_modules
ENV HOME=/opt/nodejs-echo-api
RUN chown -R node:node /opt/nodejs-echo-api && \
    chmod 755 /opt/nodejs-echo-api && \
    ls -al /opt/nodejs-echo-api
USER node:node
WORKDIR /opt/nodejs-echo-api
EXPOSE 8080
ENTRYPOINT ["npm", "start"]