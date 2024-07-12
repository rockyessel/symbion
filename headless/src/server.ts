import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import path from 'path';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { IContext } from './types/index.js';
import { typeDefs } from './typeDefs/index.js';
import { resolvers } from './resolvers/index.js';
import { ApolloServer } from 'apollo-server-express';
import express, { Application, Request, Response } from 'express';

const PORT = process.env.PORT || 9000;


const server: express.Application = express();


const httpServer = http.createServer(server);

const plugins = [
  ApolloServerPluginDrainHttpServer({ httpServer }),
  ApolloServerPluginLandingPageLocalDefault({
    embed: true,
    footer: false,
  }),
];

// Create a new ApolloServer instance
const apolloServer = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
  plugins,
  introspection: true,
  cache: 'bounded',
  context: async ({ req, res }) => ({ req, res }),
});

// Apply CORS Middleware
server.use(
  cors({
    origin: '*',
    credentials: true,
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '../public')));

const startApolloServer = async (app: Application) => {
  await apolloServer.start();
  console.log('---apolloServer started');
  // @ts-ignore
  apolloServer.applyMiddleware({ app });
};

startApolloServer(server);

// Define the dynamic path route for GraphQL
server.use(
  '/:dynamicPath/graphql',
  async (req: Request, _res: Response, next) => {
    const { dynamicPath } = req.params;
    console.log(`Dynamic path used: ${dynamicPath}`);

    apolloServer.applyMiddleware({
      // @ts-ignore
      app: server,
      path: `/${dynamicPath}/graphql`,
    });
    next();
  }
);

const isVercelProduction = process.env.VERCEL === '1';

if (!isVercelProduction) {
  server.listen(PORT, () =>
    console.log(`Server running on: http://localhost:${PORT}`)
  );
}

export { httpServer };
