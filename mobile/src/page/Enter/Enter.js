import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, BackAndroid } from 'react-native';
import _ from 'lodash';
import CodePush from 'react-native-code-push';
import color from '../../assist/color';

import Menu from '../Menu/Menu';
import Panel from '../Panel/Panel';
import Signin from '../SignIn/SignIn';
import Settings from '../Settings/Settings';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: color.background,
  },
});

export default class Enter extends Component {

  static displayName = 'Enter';

  static propTypes = {
    citizen: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    onClientChange: PropTypes.func.isRequired,
    onCitizenChange: PropTypes.func.isRequired,
  }

  static pages = {
    menu: Menu,
    panel: Panel,
    signin: Signin,
    settings: Settings,
  }

  static defaultRoute = {
    signin: { sceneConfigs: Navigator.SceneConfigs.FloatFromBottom },
    settings: { sceneConfigs: Navigator.SceneConfigs.FloatFromBottom },
  }

  componentDidMount() {
    if (!__DEV__) CodePush.notifyAppReady();

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
        return true;
      }

      return false;
    });
  }

  configureScene = route => ({
    ...route.sceneConfigs || _.get(
      Enter, `defaultRoute[${route.id}].sceneConfigs`, Navigator.SceneConfigs.FloatFromRight,
    ),
    gestures: {},
  });

  navigator = null;

  renderScene = (route, navigator) => {
    const { citizen, onClientChange, onCitizenChange } = this.props;
    const Page = Enter.pages[route.id];

    return (
      <Page
        route={route}
        navigator={navigator}
        citizen={citizen}
        onClientChange={onClientChange}
        onCitizenChange={onCitizenChange}
      />);
  }

  render() {
    return (
      <Navigator
        style={sh.viewport}
        ref={(navigator) => { this.navigator = navigator; }}
        initialRoute={{ id: 'menu' }}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }
}
