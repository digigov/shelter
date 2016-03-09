'use strict';

import React from 'react-native';
import Modal from 'react-native-modalbox';

const {
  View,
  Text,
  TouchableOpacity,
} = React;

module.exports = function({ isShow, leftText, onLeftPress, rightText, onRightPress, title, children }) {
  return (
    <Modal isOpen={isShow}>
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 54,
        paddingBottom: 50,
      }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 5,
            borderBottomColor: '#DBDCDE',
            borderBottomWidth: 1,
            backgroundColor: '#F6F7F9',
          }}>
          <TouchableOpacity style={{ padding: 10 }} onPress={onLeftPress}>
            <Text style={{ fontSize: 18, color: '#0076FF' }}>{leftText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flex: 1,
            padding: 10,
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18}}>{title}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }} onPress={onRightPress}>
            <Text style={{ fontSize: 18, color: '#0076FF' }}>{rightText}</Text>
          </TouchableOpacity>
        </View>
        { children }
      </View>
    </Modal>
  );
};