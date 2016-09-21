import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
});

function Rapids() {
  return (
    <View style={sh.viewport}>
      <Text>快速建檔</Text>
    </View>
  );
}

Rapids.displayName = 'Rapids';

export default Rapids;
