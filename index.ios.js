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

import ScanView from './pages/scan';
import SearchView from './pages/search';
import BatchView from './pages/batch';
import ExportView from './pages/export';
import RegisterView from './pages/register';

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

  renderScanButton() {
    return (
      <Icon.Button
        onPress={Actions.searchScan}
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
          <Router footer={TabBar} showNavigationBar={false} defaultRoute="search">
            <Route
              initial={true}
              name="search"
              title="查詢"
              schema="tab"
              titleStyle={styles.title}
              navigationBarStyle={styles.navigation}
            >
              <Router>
                <Route
                  name="searchInput"
                  title="查詢"
                  type="switch"
                  renderRightButton={this.renderScanButton}
                  component={SearchView} />
                <Route
                  name="searchScan"
                  title="查詢掃描"
                  component={ScanView} />
              </Router>
            </Route>
            <Route
              name="batch"
              title="批次"
              schema="tab"
              titleStyle={styles.title}
              navigationBarStyle={styles.navigation}
            >
              <Router>
                <Route
                  name="batchInput"
                  title="批次"
                  type="switch"
                  component={BatchView} />
                <Route
                  name="batchScan"
                  title="批次掃描"
                  component={ScanView} />
              </Router>
            </Route>
            <Route
              name="register"
              title="登錄"
              schema="tab"
              titleStyle={styles.title}
              navigationBarStyle={styles.navigation}
            >
              <Router>
                <Route
                  name="registerInput"
                  title="登錄"
                  type="switch"
                  component={RegisterView} />
                <Route
                  name="registerScan"
                  title="登錄掃描"
                  component={ScanView} />
              </Router>
            </Route>
            <Route
              name="export"
              title="匯出"
              schema="tab"
              titleStyle={styles.title}
              navigationBarStyle={styles.navigation}
              component={ExportView}
            />
          </Router>
        </Route>
      </Router>
    );
  }

}

AppRegistry.registerComponent('victim', () => Victim);