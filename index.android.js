'use strict';

import React, {
  AppRegistry,
  Component,
  Navigator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Router,
  Route,
  Schema,
  Animations,
  Actions,
  TabBar,
} from 'react-native-router-flux';

import TabView from './pages/tab';

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: '#16a085',
  },
  title: {
    color: '#fefefe',
  }
});

class TabIcon extends Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

class Victim extends Component {
  render() {
    return (
      <Router hideNavBar={true} name="root">
        <Schema name="tab" type="switch" icon={TabIcon} />
        <Route name="tabbar">
          <Router footer={TabBar} showNavigationBar={false} defaultRoute="tab4">
            <Route
              name="tab3"
              schema="tab"
              titleStyle={styles.title}
              navigationBarStyle={styles.navigation}
              title="查詢"
              component={TabView} />
            <Route
              initial={true}
              name="tab4"
              schema="tab"
              titleStyle={styles.title}
              navigationBarStyle={styles.navigation}
              title="新增事件"
              component={TabView} />
            <Route
              name="tab5"
              schema="tab"
              titleStyle={styles.title}
              navigationBarStyle={styles.navigation}
              title="匯出"
              component={TabView} />
          </Router>
        </Route>
      </Router>
    );
  }
}

AppRegistry.registerComponent('victim', () => Victim);