import 'primer-css/build/build.css';
import React, { Component } from 'react';
import { GoTools, GoPerson } from 'react-icons/lib/go';
import styled from 'styled-components';
import { ApolloProvider, ApolloClient } from 'react-apollo';
import Content from '../Content/Content';

const client = new ApolloClient();

const Root = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Menu = styled.div`
  width: 300px;
  height: 100%;
  padding: 3px;
`;

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Root>
          <Menu className="border-right">
            <nav className="menu centered">
              <a className="menu-item selected"><GoPerson /> 已登錄名單</a>
              <a className="menu-item"><GoTools /> 事件紀錄</a>
              <a className="menu-item"><GoTools /> 核可名單</a>
            </nav>
          </Menu>
          <Content />
        </Root>
      </ApolloProvider>
    );
  }
}
