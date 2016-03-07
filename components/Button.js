'use strict';

import React from 'react-native';

const {
  TouchableOpacity,
  Text,
} = React;

import Icon from 'react-native-vector-icons/Ionicons';

module.exports = function({ onPress, label, icon, ...otherProps }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1abc9c',
        backgroundColor: '#16a085',
        margin: 8,
        paddingTop: 6,
        paddingBottom: 4,
      }}
      onPress={onPress}
      {...otherProps}
    >
      { icon && <Icon
        name={icon}
        color="#FEFEFE"
        size={28}
      /> }
      <Text style={{
        paddingBottom: 3,
        paddingLeft: 5,
        color: '#FEFEFE',
        fontSize: 20,
      }}>{label}</Text>
    </TouchableOpacity>
  );
};