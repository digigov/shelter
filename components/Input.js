'use strict';

import React from 'react-native';

const {
  View,
  Text,
  TextInput,
} = React;

import Icon from 'react-native-vector-icons/Ionicons';

module.exports = function({ value, onChange, label, enableClean, ...otherProps }) {
  return (
    <View
      style={{
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        margin: 5,
      }}
    >
      <Text style={{
        padding: 5,
        width: 100,
      }}>{label || '欄位'}：</Text>
      <TextInput
        style={{
          flex: 1,
        }}
        value={value}
        onChangeText={onChange}
        {...otherProps}
      />
      { enableClean && <Icon.Button
        onPress={() => onChange('')}
        name="ios-close-outline"
        backgroundColor="#F5FCFF"
        color="#000"
        width={36}
        size={24}
      /> }
    </View>
  );
};