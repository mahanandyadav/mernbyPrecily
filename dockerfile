# ui build
FROM node:14-slim  AS  ui-build
WORKDIR /usr/src
COPY ui ./ui/
RUN cd ./ui && npm install && npm run webpack
RUN ls

# api build
FROM node:14-slim AS api-build
WORKDIR /usr/src
ENV MNY=mahanand_yadav\
    PORT=80\
    MONGO_DB_STRING=mongodb://mern-precily-cosmosdb:jb2RAayZNYpYRxMFLG6JNx6wugqBSKrxqsIqMHnLqSMzlJiy1qERze5chmclup1raXtTpf12yOqS1hKhPoO9jw==@mern-precily-cosmosdb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mern-precily-cosmosdb@
    # MONGO_DB_STRING=mongodb+srv://mny:QTCdKtIouJJWbUYN@cluster0.zxfwd.mongodb.net/MernDocker?retryWrites=true&w=majority
COPY api ./api/
RUN cd  api && npm install && ENVIRONMENT=production npm run build
RUN ls

#Packaging the app
FROM node:14-slim
WORKDIR /root/
COPY --from=ui-build /usr/src/ui/build  ./ui/build
COPY --from=api-build /usr/src/api/dist  .
RUN ls

EXPOSE 80

CMD ["node","api.bundle.js"]