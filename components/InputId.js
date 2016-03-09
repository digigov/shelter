'use strict';

import React from 'react-native';

const {
  View,
  TextInput,
  TouchableOpacity,
} = React;

import Icon from 'react-native-vector-icons/Ionicons';

module.exports = function({ value, onChange, label, ...otherProps }) {
  return (
    <View
      style={{
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextInput
        style={{
          flex: 1,
          borderColor: 'gray',
          borderWidth: 1,
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
};