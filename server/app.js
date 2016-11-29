import express from 'express';
import expressGraphQL from 'express-graphql';
import moment from 'moment-timezone';
import Schema from './src/Schema';

const NODE_PORT = process.env.NODE_PORT || 8080;

moment.tz.setDefault('Asia/Taipei');

const server = express();

server.use('/', expressGraphQL({
  schema: Schema,
  pretty: true,
  graphiql: process.env.NODE_ENV === 'development',
  formatError: (error) => {
    console.error(error);
    return {
      name: error.name || 'UnknownError',
      message: error.message || 'Unknown Error',
    };
  },
}));

server.listen(NODE_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${NODE_PORT}`
));
