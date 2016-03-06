'use strict';

import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ListView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Camera from 'react-native-camera';

export default class extends Component {

  hasRead = false;

  onBarCodeRead = (e) => {
    if (this.hasRead) return;

    this.hasRead = true;
    Actions.searchInput({
      inputId: e.data,
      inputIdTimestamp: new Date().getTime(),
    });
  };

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 64,
      }}>
        <Camera
          style={styles.preview}
          aspect={Camera.constants.Aspect.Fill}
          onBarCodeRead={this.onBarCodeRead}
        >
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 160,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F6F6F6',
  },
  text: {
    flex: 1,
  },
});