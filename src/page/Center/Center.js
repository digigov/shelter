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

function Center() {
  return (
    <View style={sh.viewport}>
      <Text>應變中心</Text>
    </View>
  );
}

Center.displayName = 'Center';

export default Center;
