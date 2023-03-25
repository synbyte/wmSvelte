FROM gitpod/workspace-node-lts
USER root
RUN mkdir ./app
COPY . ./app
WORKDIR ./app

RUN npm install && npm run build
COPY . .
EXPOSE 5173
CMD ["npm","run","dev"]