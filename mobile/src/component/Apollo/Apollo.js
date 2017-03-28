/* eslint no-param-reassign: ["error", { "props": false }] */

import _ from 'lodash';
import url from 'url-parse';
import React, { PropTypes } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

export default class extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    uri: PropTypes.string,
  }

  static defaultProps = {
    uri: '',
  }

  state = {
    client: null,
  }

  componentWillMount() {
    this.setClient(this.props.uri);
  }

  componentWillReceiveProps(nextProps) {
    const { uri } = nextProps;

    if (this.props.uri !== uri) this.setClient(uri);
  }

  setClient = (uri) => {
    const configs = url(uri);
    const networkInterface = createNetworkInterface({ uri: `${configs.origin}${configs.pathname}` });

    networkInterface
      .use([{
        applyMiddleware: (req, next) => {
          const headers = _.get(req, 'options.headers', {});

          headers.authorization = `Bearer ${configs.auth}`;
          req.options.headers = headers;

          next();
        },
      }]);

    const client = new ApolloClient({ networkInterface });

    client.uri = uri;

    this.setState({ client });
  }

  render() {
    const { children } = this.props;
    const { client } = this.state;

    return (
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    );
  }
}
