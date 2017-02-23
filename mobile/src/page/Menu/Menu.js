import React, { PropTypes, Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Margin, Item, Title } from '../../component/';
import { generate } from '../../help/VictimId/VictimId';
import color from '../../assist/color';
import size from '../../assist/size';
import info from '../../../package.json';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  checkin: {
    backgroundColor: color.primary,
    paddingBottom: 5,
    borderBottomWidth: 3,
    borderBottomColor: color.primaryAssist,
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
  version: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  versionText: {
    color: color.primaryAssist,
  },
});

export default class Menu extends Component {

  static displayName = 'Menu';

  static propTypes = {
    navigator: PropTypes.shape(),
  }

  onSignInPress = (action) => this.props.navigator.push({ id: 'panel', action });

  onRequestVictimIdPress = () => this.props.navigator.push(
    { id: 'signin', action: '登錄災民', victimId: generate() }
  );

  render() {
    return (
      <View style={sh.viewport}>
        <View style={sh.checkin}>
          <Margin>
            <Title style={sh.title} color={color.background}>臺北市社會局</Title>
            <View style={sh.header} />
            <Item
              label="登錄災民資料"
              labelColor={color.background}
              onPress={() => this.onSignInPress('登錄災民')}
            />
            <View style={sh.hr} />
            <Item
              label="配發臨時證號"
              labelColor={color.background}
              onPress={this.onRequestVictimIdPress}
            />
            <View style={sh.version}>
              <Text style={sh.versionText}>{info.version}</Text>
            </View>
          </Margin>
        </View>
        <ScrollView style={sh.viewport}>
          <Margin>
            <View style={sh.item}>
              <Item label="領取物資登記" onPress={() => this.onSignInPress('領取物資')} />
            </View>
            <View style={sh.item}>
              <Item label="領取餐食登記" onPress={() => this.onSignInPress('領取餐食')} />
            </View>
          </Margin>
        </ScrollView>
      </View>
    );
  }
}
