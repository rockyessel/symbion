import express from 'express';
import { ApolloServer } from '@apollo/server';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './typeDefs/index.js';
import { IContext } from './types/index.js';
import http from 'http';
import cors from 'cors';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert `import.meta.url` to `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
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

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '../public')));
console.log('Dir: ', path.join(__dirname, '../public'));

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
server.use(
  '/graphql',
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: PORT }, resolve)
);
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);

export default httpServer;
