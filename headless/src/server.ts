import express from 'express';
import { ApolloServer } from '@apollo/server';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { IContext } from './types';
import http from 'http';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';

// Required logic for integrating with Express
const server = express();
// Our httpServer handles incoming requests to our Express server.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(server);

// Create a new ApolloServer instance
const apolloServer = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our apolloServer to start
await apolloServer.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
server.use(
  '/',
  cors<cors.CorsRequest>(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 5000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:5000/`);

export default httpServer;
