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
import NavLeftButton from './components/NavLeftButton';

import ScanView from './pages/scan.android';
import SearchView from './pages/search';
import BatchView from './pages/batch';
import ExportView from './pages/export';
import RegisterView from './pages/register';

const styles = StyleSheet.create({
  scan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

class TabIcon extends Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? '#16a085' :'black'}}>{this.props.title}</Text>
    );
  }
}

class Victim extends Component {

  render() {
    return (
      <Router hideNavBar={true} name="root">
        <Schema
          name="tab"
          type="switch"
          icon={TabIcon}
          titleStyle={{color: '#fefefe'}}
          navigationBarStyle={{backgroundColor: '#16a085'}}
        />
        <Route name="tabbar">
          <Router footer={TabBar} showNavigationBar={false} defaultRoute="search">
            <Route
              initial={true}
              name="search"
              title="查詢"
              schema="tab"
            >
              <Router>
                <Route
                  name="searchInput"
                  title="查詢"
                  type="switch"
                  renderRightButton={() => {
                    return (
                      <Icon.Button
                        onPress={Actions.searchScan}
                        name="ios-barcode-outline"
                        backgroundColor="transparent"
                        height={46}
                        size={24}
                      >
                        <Text style={{color: '#FEFEFE'}}>掃描</Text>
                      </Icon.Button>
                    );
                  }}
                  component={SearchView} />
                <Route
                  name="searchScan"
                  title="查詢掃描"
                  renderLeftButton={() => <NavLeftButton onPress={Actions.pop} icon="chevron-left" />}
                  component={ScanView} />
              </Router>
            </Route>
            <Route
              name="batch"
              title="批次"
              schema="tab"
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
                  renderLeftButton={() => <NavLeftButton onPress={Actions.pop} icon="chevron-left" />}
                  component={ScanView} />
              </Router>
            </Route>
            <Route
              name="register"
              title="登錄"
              schema="tab"
            >
              <Router>
                <Route
                  name="registerInput"
                  title="登錄"
                  type="switch"
                  renderRightButton={() => {
                    return (
                      <Icon.Button
                        onPress={Actions.registerScan}
                        name="ios-barcode-outline"
                        backgroundColor="#16a085"
                        height={46}
                        size={24}
                      >
                        <Text style={{color: '#FEFEFE'}}>掃描</Text>
                      </Icon.Button>
                    );
                  }}
                  component={RegisterView} />
                <Route
                  name="registerScan"
                  title="登錄掃描"
                  renderLeftButton={() => <NavLeftButton onPress={Actions.pop} icon="chevron-left" />}
                  component={ScanView} />
              </Router>
            </Route>
            <Route
              name="export"
              title="匯出"
              schema="tab"
              component={ExportView}
            />
          </Router>
        </Route>
      </Router>
    );
  }

}

AppRegistry.registerComponent('victim', () => Victim);