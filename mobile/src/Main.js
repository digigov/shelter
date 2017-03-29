import _ from 'lodash';
import React, { Component } from 'react';
import { Alert, View, InteractionManager, AsyncStorage } from 'react-native';
import CodePush from 'react-native-code-push';
import Analytics from './help/Analytics/Analytics';
import { Apollo } from './component';
import Enter from './page/Enter/Enter';

export default class extends Component {

  state = {
    uri: null,
    citizen: [],
  };

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
          );
        }
      });
    });
  }

  async componentDidMount() {
    const uri = await AsyncStorage.getItem('@g0v.victim:uri');
    this.onClientChange(uri || '');
    const citizen = JSON.parse(await AsyncStorage.getItem('@g0v.victim:citizen'));
    if (_.isArray(citizen)) this.onCitizenChange(citizen);
  }

  onClientChange = async (uri) => {
    this.setState({ uri });
    await AsyncStorage.setItem('@g0v.victim:uri', uri);
  }

  onCitizenChange = async (citizen) => {
    this.setState({ citizen });
    await AsyncStorage.setItem('@g0v.victim:citizen', JSON.stringify(citizen));
  }

  render() {
    const { uri, citizen } = this.state;

    if (uri === null) {
      return (<View />);
    }

    return (
      <Apollo uri={uri}>
        <Enter
          citizen={citizen}
          onClientChange={this.onClientChange}
          onCitizenChange={this.onCitizenChange}
        />
      </Apollo>
    );
  }
}
