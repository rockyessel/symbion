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

const main = async () => {
  // Required logic for integrating with Express
  const server = express();
  // Our httpServer handles incoming requests to our Express server.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(server);

  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];

  // Create a new ApolloServer instance
  const apolloServer = new ApolloServer<IContext>({
    typeDefs,
    resolvers,
    plugins,
    playground: true,
    introspection: true,
  });

  // Ensure we wait for our apolloServer to start
  await apolloServer.start();

  server.use(cors());
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(express.static(path.join(__dirname, '../public')));
  server.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  // Start the Express server
  server.listen(PORT, () => {
    console.log(' Directory: ', path.join(__dirname, '../public'));
    console.log(` Server ready at http://localhost:${PORT}/graphql`);
    console.log(` Playground available at http://localhost:${PORT}/graphql`);
  });
};

main();
