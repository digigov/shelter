import React, { Component } from 'react';
import { Navigator, StyleSheet } from 'react-native';
import _ from 'lodash';
import CodePush from 'react-native-code-push';
import color from 'color';

import Menu from '../Menu/Menu';
import Panel from '../Panel/Panel';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: color.background,
  },
});

export default class Enter extends Component {

  static displayName = 'Enter';

  static pages = {
    menu: Menu,
    panel: Panel,
  }

  static defaultRoute = {
  }

  componentDidMount() {
    if (!__DEV__) CodePush.notifyAppReady();
  }

  configureScene = (route) => ({
    ...route.sceneConfigs || _.get(
      Enter, `defaultScenes[${route.id}].sceneConfigs`, Navigator.SceneConfigs.FloatFromRight
    ),
    gestures: {},
  });

  renderScene = (route, navigator) => {
    const Page = Enter.pages[route.id];

    return (<Page route={route} navigator={navigator} />);
  }

  render() {
    return (
      <Navigator
        style={sh.viewport}
        initialRoute={{ id: 'menu' }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}
