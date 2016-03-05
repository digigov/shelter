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

import Icon from 'react-native-vector-icons/Ionicons';

import TabView from './pages/tab';
import SearchView from './pages/search';

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: '#16a085',
  },
  scan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
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
  onPress() {
    console.log(123);
  }

  renderScanButton() {
    return (
      <Icon.Button
        onPress={this.onPress}
        name="ios-barcode-outline"
        backgroundColor="#16a085"
        height={46}
        size={24}
      >
        <Text style={{color: '#FEFEFE'}}>掃描</Text>
      </Icon.Button>
    );
  }

  render() {
    return (
      <Router hideNavBar={true} name="root">
        <Schema name="tab" type="switch" icon={TabIcon} />
        <Route name="tabbar">
          <Router footer={TabBar} showNavigationBar={false} defaultRoute="tab4">
            <Route
              initial={true}
              name="tab3"
              schema="tab"
              title="查詢"
              titleStyle={styles.title}
              navigationBarStyle={styles.navigation}
              renderRightButton={this.renderScanButton}
              component={SearchView} />
            <Route
              name="tab4"
              schema="tab"
              titleStyle={styles.title}
              navigationBarStyle={styles.navigation}
              title="批次掃描"
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