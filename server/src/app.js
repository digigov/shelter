import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import express from 'express';
import proxy from 'http-proxy-middleware';
import expressGraphQL from 'express-graphql';
import moment from 'moment-timezone';
import Schema from './Schema';

const PORT = process.env.NODE_PORT || process.env.PORT || 8080;

moment.tz.setDefault('Asia/Taipei');

const app = express();

app.use('/graphql', expressGraphQL({
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

if (!fs.existsSync(path.resolve(__dirname, '../build'))) {
  app.get('/', proxy({ target: 'http://localhost:3000', changeOrigin: true }));
  app.get('/static/*', proxy({ target: 'http://localhost:3000', changeOrigin: true }));
} else {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
  app.get('/static/*', express.static(path.resolve(__dirname, './../build')));
}

app.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}`,
));
