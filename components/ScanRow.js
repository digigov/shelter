'use strict';

import React from 'react-native';

const {
  Text,
  View,
  Alert,
  TouchableOpacity,
} = React;

import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

module.exports = function({ data, onRemove }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 5,
      }}
    >
      <Text style={{
        fontSize: 26,
        padding: 6,
        paddingLeft: 8,
        paddingTop: 8,
        borderColor: '#131313',
        borderWidth: 1,
      }}>{data.type}</Text>
      <View style={{
        flex: 1,
        padding: 2,
        paddingLeft: 10,
      }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 18,
            overflow: 'hidden',
          }}
        >{data.victimId || data.taiwanId}</Text>
        <Text style={{
          flex: 1,
          fontSize: 12,
          textAlign: 'right',
          marginTop: 3,
        }}>- {moment(data.createdAt).format('YYYY-MM-DD HH:mm')}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('確定要刪除紀錄？', null, [
            {text: '取消'},
            {text: '刪除', onPress: () => onRemove(data)},
          ]);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 2,
          marginLeft: 5,
          paddingLeft: 5,
          borderLeftColor: '#131313',
          borderLeftWidth: 1,
        }}
      >
        <Icon name="ios-trash-outline" size={28} />
        <Text>刪除</Text>
      </TouchableOpacity>
    </View>
  );
};