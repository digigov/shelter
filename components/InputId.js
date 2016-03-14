'use strict';

import React, { Component } from 'react-native';
import TextInputState from 'TextInputState';
import findNodeHandle from 'findNodeHandle';

const {
  View,
  TextInput,
  TouchableOpacity,
} = React;

import Icon from 'react-native-vector-icons/Ionicons';

module.exports = class extends Component {

  focus() {
    TextInputState.focusTextInput(findNodeHandle(this.refs.input));
  }

  render() {
    const { value, onChange, label, ...otherProps } = this.props;

    return (
      <View
        style={{
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        }}
      >
        <TextInput
          ref="input"
          style={{
            flex: 1,
            textAlign: 'center',
          }}
          placeholder="請輸入證件字號"
          autoFocus={true}
          value={value}
          onChangeText={onChange}
          {...otherProps}
        />
        <TouchableOpacity
          onPress={() => onChange('')}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <Icon
            name="ios-close-outline"
            backgroundColor="#F5FCFF"
            color="#000"
            width={36}
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }
};