'use strict';

import React from 'react-native';

const {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} = React;

export default function({ isShowEditer, onEditer, value, onChange }) {
  return isShowEditer ? (
    <TextInput
      multiline={true}
      placeholder="細節（選填）"
      style={{
        flex: 1,
        fontSize: 14,
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: '#E5ECEF',
      }}
      onChangeText={onChange}
      value={value}
    />
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
  )
};