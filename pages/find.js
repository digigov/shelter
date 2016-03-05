'use strict';

import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  ListView,
} from 'react-native';

import Camera from 'react-native-camera';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const list = [];

class victim extends Component {

  state = {
    dataSource: ds.cloneWithRows(list),
  };

  onBarCodeRead = (e) => {
    list.unshift(e.data);

    this.setState({
      dataSource: ds.cloneWithRows(list)
    });
  };

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight>
        <View style={styles.row}>
          <Text style={styles.text}>
            {rowData}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.Fill}
          onBarCodeRead={this.onBarCodeRead}
        >
        </Camera>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 200,
    width: Dimensions.get('window').width,
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

AppRegistry.registerComponent('victim', () => victim);