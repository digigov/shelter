import 'babel-polyfill';
import path from 'path';
import express from 'express';
import expressGraphQL from 'express-graphql';
import moment from 'moment-timezone';
import Schema from './Schema';

const PORT = process.env.NODE_PORT || process.env.PORT || 8080;

moment.tz.setDefault('Asia/Taipei');

const server = express();

server.use('/graphql', expressGraphQL({
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

server.use(express.static(path.resolve(__dirname, './../build')));

server.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../build/index.html'));
});

server.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}`
));
