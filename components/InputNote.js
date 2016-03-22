'use strict';

import React, { Component } from 'react-native';
import Record from '../lib/Record';
import _ from 'lodash';

const {
  View,
  ListView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} = React;

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => true,
});

module.exports = class extends Component {

  state = {
    dataSource: ds.cloneWithRows([]),
  };

  dataSource = [];

  componentDidMount() {
    // Record.find({}).then(results => {
    //   this.dataSource = _.uniq(_.map(results || [], item => item.note));
    // });
  }

  onInputChange = (value) => {
    const { onChange } = this.props;
    const { dataSource } = this.state;

    // this.setState({
    //   dataSource: ds.cloneWithRows(value ? _.filter(this.dataSource, text => _.includes(text, value)): []),
    // });

    onChange && onChange(value);
  };

  render() {
    const {
      isShowEditer,
      onEditer,
      value,
      onChange,
    } = this.props;

    const {
      dataSource,
    } = this.state;

    return isShowEditer ? (
      <View>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: '#E5ECEF',
            borderBottomWidth: 1,
            margin: 5,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            autoFocus={true}
            placeholder="細節（選填）"
            onChangeText={this.onInputChange}
            value={value}
          />
        </View>
        <ListView
          style={{ flex: 1 }}
          dataSource={dataSource}
          renderRow={(item) => (
            <TouchableOpacity
              onPress={() => this.onInputChange(item)}
            >
              <View style={{
                height: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                paddingLeft: 5,
                paddingRight: 5,
                borderBottomColor: '#f39c12',
                borderBottomWidth: 1,
              }}>
                <Text style={{
                  flex: 1,
                  color: '#f39c12',
                }}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    ) : (
      <TouchableOpacity onPress={onEditer}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#DBDCDE',
            borderBottomWidth: 1,
            borderTopColor: '#DBDCDE',
            borderTopWidth: 1,
            backgroundColor: '#F6F7F9',
            padding: 10,
          }}>
          <Text style={{ fontSize: 18 }}>細節：</Text>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 18,
              overflow: 'hidden',
            }}
          >{value}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}