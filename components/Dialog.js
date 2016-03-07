'use strict';

import React from 'react-native';

const {
  View,
  Modal,
  Text,
  TouchableOpacity,
} = React;

module.exports = function({ isShow, leftText, onLeftPress, rightText, onRightPress, title, children }) {
  return (
    <Modal animated={true} visible={isShow}>
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 20,
            borderBottomColor: '#DBDCDE',
            borderBottomWidth: 1,
            backgroundColor: '#F6F7F9',
          }}>
          <TouchableOpacity style={{ padding: 10 }} onPress={onLeftPress}>
            <Text style={{ fontSize: 18, color: '#0076FF' }}>{leftText}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, padding: 10 }}>{title}</Text>
          <TouchableOpacity style={{ padding: 10 }} onPress={onRightPress}>
            <Text style={{ fontSize: 18, color: '#0076FF' }}>{rightText}</Text>
          </TouchableOpacity>
        </View>
        { children }
      </View>
    </Modal>
  );
};