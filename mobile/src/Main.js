import React, { Component } from 'react';
import { StyleSheet, Alert, View, InteractionManager } from 'react-native';
import CodePush from 'react-native-code-push';
import Analytics from './help/Analytics/Analytics';
import Enter from './page/Enter/Enter';
import color from './assist/color';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    backgroundColor: color.primary,
  },
});

export default class extends Component {

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      CodePush.sync({}, (status) => {
        if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
          Alert.alert(
            '更新數據已就緒',
            '是否立即重啟更新？',
            [
              { text: '稍後', onPress: () => {} },
              { text: '立即重啟', onPress: () => CodePush.restartApp() },
            ],
          )
        }
      });
    });
  }

  render() {
    return (
      <View style={sh.viewport}>
        <Enter />
      </View>
    );
  }
}
