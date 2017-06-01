import 'primer-css/build/build.css';
import React, { Component } from 'react';
import { GoTools, GoPerson } from 'react-icons/lib/go';
import styled from 'styled-components';
import moment from 'moment';

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

const Content = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  padding-bottom: 0;
`;

const Table = styled.table`
  width: 100%;
`;

const Th = styled.th`
  height: 30px;
`;

export default class App extends Component {
  render() {
    return (
      <Root>
        <Menu className="border-right">
          <nav className="menu centered">
            <a className="menu-item selected"><GoPerson /> 已登錄名單</a>
            <a className="menu-item"><GoTools /> 事件紀錄</a>
            <a className="menu-item"><GoTools /> 核可名單</a>
          </nav>
        </Menu>
        <Content>
          <Table>
            <thead className="border-bottom">
              <Th>時間</Th>
              <Th>證件字號</Th>
              <Th>姓名</Th>
              <Th>聯絡電話</Th>
            </thead>
          </Table>
        </Content>
      </Root>
    );
  }
}
