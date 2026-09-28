FROM node:22-slim

WORKDIR /workbench
COPY server.mjs ./server.mjs

ENV PORT=8080
ENV ALT_PORT=9090

EXPOSE 8080 9090

CMD ["node", "server.mjs"]
