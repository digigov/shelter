import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Margin, Item, Title } from '../../component/';
import _ from 'lodash';
import color from '../../assist/color';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  checkin: {
    backgroundColor: color.primaryAssist,
    paddingBottom: 5,
  },
  title: {
    marginTop: size.statusBar + (size.navbar / 2),
    marginBottom: size.navbar / 2,
  },
  header: {
    borderBottomColor: color.background,
    borderBottomWidth: 1,
    width: 70,
  },
  hr: {
    borderBottomColor: color.background,
    borderBottomWidth: 1,
  },
  item: {
    borderBottomColor: color.border,
    borderBottomWidth: 1,
  },
});

export default class Menu extends Component {

  static displayName = 'Menu';

  onCheckInPress = () => {};

  onRequestVictimIdPress = () => {};

  onSignInPress = () => {};

  render() {
    return (
      <ScrollView style={sh.viewport}>
        <View style={sh.checkin}>
          <Margin>
            <Title style={sh.title}>臺北市社會局</Title>
            <View style={sh.header} />
            <Item label="登錄災民資料" onPress={this.onCheckInPress} />
            <View style={sh.hr} />
            <Item label="配發臨時證號" onPress={this.onRequestVictimIdPress} />
          </Margin>
        </View>
        <Margin>
          <View style={sh.item}>
            <Item label="領取物資登記" onPress={() => this.onSignInPress('物資')} />
          </View>
          <View style={sh.item}>
            <Item label="領取餐食登記" onPress={() => this.onSignInPress('餐食')} />
          </View>
        </Margin>
      </ScrollView>
    );
  }
}
