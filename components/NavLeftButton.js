'use strict';

import React from 'react-native';

const {
  TouchableOpacity,
} = React;

import Icon from 'react-native-vector-icons/Ionicons';

module.exports = function({ onPress, icon, text }) {
  return (
    <TouchableOpacity style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 8,
      paddingTop: 3,
      paddingBottom: 1,
    }}>
      <Icon
        onPress={onPress}
        name={icon}
        color="#FEFEFE"
        size={24}
      />
      { text && <Text style={{ paddingBottom: 3, paddingLeft: 5, color: '#FEFEFE' }}>{text}</Text>}
    </TouchableOpacity>
  );
};