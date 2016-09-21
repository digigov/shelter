import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Margin, Title, Label, Item } from 'component';
import color from 'color';
import size from 'size';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    paddingTop: size.statusBar + size.navbar,
  },
});

export default class Center extends Component {

  static displayName = 'Center';

  onDocketPress = () => {
    Alert.alert('Info', '現在尚無開設專案');
  }

  onVictimPress = () => {
    Alert.alert('Info', '功能即將推出');
  }

  render() {
    return (
      <View style={sh.viewport}>
        <Margin>
          <Title>應變中心</Title>
          <Item label="專案" isFirst onPress={this.onDocketPress}>
            <Label color={color.primary}>更改</Label>
          </Item>
          <Item label="災民證號" onPress={this.onVictimPress}>
            <Label color={color.primary}>列印</Label>
          </Item>
        </Margin>
      </View>
    );
  }
}
