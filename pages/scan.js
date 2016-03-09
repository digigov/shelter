'use strict';

import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ListView,
} from 'react-native';

import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import Record from '../lib/Record';
import { verifyVictimId, verifyTaiwanId } from '../lib/verification';

import {
  InputId,
  RecordRow,
} from '../components'

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => true,
});

export default class extends Component {

  state = {
    inputId: '',
    isTaiwanId: false,
    isVictimId: false,
    dataSource: ds.cloneWithRows([]),
  };

  hasRead = false;

  dataSource = [];

  updateDataSource(data) {
    this.dataSource = data;
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.dataSource) });
  }

  onBarCodeRead = (e) => {
    if (this.hasRead) return;

    this.hasRead = true;
    switch(this.props.route.name) {
    case 'searchScan':
      Actions.searchInput({
        inputId: e.data,
        inputIdTimestamp: new Date().getTime(),
      });
      break;
    case 'batchScan':
      this.onInputChange(e.data);
      break;
    case 'registerScan':
      Actions.registerInput({
        inputId: e.data,
        inputIdTimestamp: new Date().getTime(),
      });
      break;
    }
  };

  handleInsert({ taiwanId, victimId }) {
    const {
      inputType,
      inputNote,
    } = this.props;

    Record
      .insert({ taiwanId, victimId, type: inputType, note: inputNote })
      .then(obj => {
        this.dataSource.unshift(obj);

        this.setState({ 
          dataSource: this.state.dataSource.cloneWithRows(this.dataSource),
          isInsertVisible: false,
        });
      });
  };

  onInputChange = (inputId) => {
    let isTaiwanId = false;
    let isVictimId = false;
    inputId = inputId.toUpperCase();

    if (verifyTaiwanId(inputId)) {
      isTaiwanId = true;
      this.handleInsert({ taiwanId: inputId });
    } else if (verifyVictimId(inputId)) {
      isVictimId = true;
      this.handleInsert({ victimId: inputId });
    }

    this.setState({ inputId, isTaiwanId, isVictimId });
  };

  onRemove = (data) => {
    Record.removeById(data._id);

    this.updateDataSource(this.dataSource.filter(item => item._id !== data._id));
  };

  render() {
    const routeName = this.props.route.name;

    const {
      inputId,
      dataSource,
    } = this.state;

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 64,
      }}>
        <Camera
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 140,
          }}
          aspect={Camera.constants.Aspect.Fill}
          onBarCodeRead={this.onBarCodeRead}
        >
        </Camera>
        { routeName === 'batchScan' && 
          <InputId
            value={inputId}
            onChange={this.onInputChange}
          />
        }
        { routeName === 'batchScan' && 
          <ListView
            style={{ flex: 1 }}
            dataSource={dataSource}
            renderRow={(item) => <RecordRow data={item} onRemove={this.onRemove} />}
          />
        }
      </View>
    );
  }
}