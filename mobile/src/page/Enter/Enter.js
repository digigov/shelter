import React, { Component } from 'react';
import { Navigator, StyleSheet } from 'react-native';
import color from 'color';

import Tab from '../Tab/Tab';
import Single from '../Single/Single';
import Swirls from '../Swirls/Swirls';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: color.background,
  },
});

const pages = {
  tab: Tab,
  single: Single,
  swirls: Swirls,
};

const defaultRoute = {
  tab: { id: 'tab' },
  single: { id: 'single' },
  swirls: { id: 'swirls' },
};

export default class Enter extends Component {

  static displayName = 'Enter';

  navigator = null;

  nav = {
    push: (id, route) => this.navigator.push({ ...defaultRoute[id], ...route }),
    pop: () => this.navigator.pop(),
    replace: (id, route) => this.navigator.replace({ ...defaultRoute[id], ...route }),
  }

  renderScene = (route) => {
    const Page = pages[route.id];

    return (<Page nav={this.nav} route={route} />);
  }

  render() {
    return (
      <Navigator
        style={sh.viewport}
        ref={navigator => { this.navigator = navigator; }}
        initialRoute={{ id: 'tab' }}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.HorizontalSwipeJump,
        })}
      />
    );
  }
}
