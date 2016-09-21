import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import find from 'lodash/find';
import color from 'color';
import TabBar from './TabBar';

import Search from '../Search/Search';
import Rapids from '../Rapids/Rapids';
import Center from '../Center/Center';

const INITIAL_TAB = 2;
const TABBAR_HEIGHT = 55;

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: color.background,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? TABBAR_HEIGHT : 0,
  },
});

const tabs = [
  { id: 'search' },
  { id: 'rapids' },
  { id: 'center' },
];

export default class Enter extends Component {

  static displayName = 'Enter';

  onTabSelect = (id) => {
    const tab = find(tabs, o => o.id === id);
    this.navigator.jumpTo(tab);
  }

  navigator = null;

  renderScene = (route, navigator) => {
    let container;

    switch (route.id) {
      case 'search':
        container = <Search navigator={navigator} />;
        break;
      case 'rapids':
        container = <Rapids navigator={navigator} />;
        break;
      case 'center':
        container = <Center navigator={navigator} />;
        break;
      default:
        throw new Error('Not found tab');
    }

    return (<View style={sh.container}>{container}</View>);
  }

  render() {
    return (
      <Navigator
        debugOverlay={false}
        style={sh.viewport}
        ref={navigator => { this.navigator = navigator; }}
        initialRoute={tabs[INITIAL_TAB]}
        initialRouteStack={tabs}
        renderScene={this.renderScene}
        configureScene={() => ({
          ...Navigator.SceneConfigs.HorizontalSwipeJump,
        })}
        navigationBar={
          <TabBar
            height={TABBAR_HEIGHT}
            initialSelected={tabs[INITIAL_TAB].id}
            onSelect={this.onTabSelect}
            searchBadge={0}
            rapidsBadge={0}
            centerBadge={0}
          />
        }
      />
    );
  }
}
