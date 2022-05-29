import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import "reflect-metadata";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";
import { getSchema } from "./schema";
dotenv.config();

const graphQlPath = process.env.GRAPH_QL_PATH;
const port = process.env.PORT;
const dbUrl = process.env.MONGO_DB_URL;

mongoose
  .connect(dbUrl, {
    autoIndex: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    graphQlPath,
    cors({
      origin: "*",
    }),
    bodyParser.json()
  );

  const schema = await getSchema();
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    introspection: true,
  });
  await server.start();

  server.applyMiddleware({ app, path: "/" });
  await new Promise((resolve) => httpServer.listen({ port }));

  console.log(`Server started at http://localhost:${port}/${graphQlPath}`);
  return { server, app };
}

startApolloServer();
