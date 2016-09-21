import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { VictimIdKeyboard } from 'component';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
});

function Search() {
  return (
    <View style={sh.viewport}>
      <VictimIdKeyboard />
    </View>
  );
}

Search.displayName = 'Search';

export default Search;
