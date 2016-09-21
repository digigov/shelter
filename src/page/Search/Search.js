import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { TaiwanIdKeyboard } from 'component';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
});

function Search() {
  return (
    <View style={sh.viewport}>
      <TaiwanIdKeyboard />
    </View>
  );
}

Search.displayName = 'Search';

export default Search;
