import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { gql, graphql } from 'react-apollo';
import moment from 'moment';

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

const Td = styled.td`
  height: 30px;
  text-align: center;
`;

class Component extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Content>
        <Table>
          <thead className="border-bottom">
            <Th>時間</Th>
            <Th>證件字號</Th>
            <Th>姓名</Th>
            <Th>聯絡電話</Th>
          </thead>
          <tbody>
            {_.map(data.victim, (item) => (
              <tr>
                <Td></Td>
                <Td>{item.victimId}</Td>
                <Td>{item.fullname}</Td>
                <Td>{item.phoneNumber}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    );
  }
}

export default graphql(gql`
  query {
    victim {
      id
      victimId
      fullname
      phoneNumber
    }
  }
`)(Component);
