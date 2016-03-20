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
    showId: '',
    isTaiwanId: false,
    isVictimId: false,
    isShowCamera: true,
    dataSource: ds.cloneWithRows([]),
  };

  hasRead = false;

  dataSource = [];

  componentWillReceiveProps(nextProps) {
    this.setState({
      isShowCamera: ['searchScan', 'batchScan', 'registerScan'].indexOf(nextProps.route.name) > -1
    });
  }

  updateDataSource(data) {
    this.dataSource = data;
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.dataSource) });
  }

  onBarCodeRead = (e) => {
    if (this.hasRead) return;

    console.log(e);

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
      this.hasRead = false;
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
          showId: taiwanId || victimId,
          dataSource: this.state.dataSource.cloneWithRows(this.dataSource),
          isInsertVisible: false,
        });

        setTimeout(() => this.setState({ showId: '' }), 1000);
      });
  };

  onInputChange = (inputId) => {
    let isTaiwanId = false;
    let isVictimId = false;
    inputId = inputId.toUpperCase();

    if (inputId === this.state.inputId) return;

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

  onKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      this.onInputChange('');
      setTimeout(() => this.refs.input.focus(), 100);
    }
  };

  render() {
    const routeName = this.props.route.name;

    const {
      inputId,
      showId,
      dataSource,
      isShowCamera,
    } = this.state;

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 64,
      }}>
        { isShowCamera &&
          <Camera
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: 100,
            }}
            captureMode={Camera.constants.CaptureMode.code}
            aspect={Camera.constants.Aspect.fill}
            orientation={Camera.constants.Orientation.portrait}
            captureAudio={false}
            keepAwake={true}
            onBarCodeRead={this.onBarCodeRead}
          />
        }
        { showId !== '' && (
          <View style={{
            position: 'absolute',
            margin: 5,
            marginTop: 69,
            top: 0,
            right: 0,
            left: 0,
            height: 90,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FEFEFD',
            borderWidth: 5,
            borderColor: 'gray',
          }}>
            <Text style={{
              fontSize: 20,
            }}>{showId}</Text>
          </View>
        )}
        { routeName === 'batchScan' && 
          <InputId
            ref="input"
            value={inputId}
            onChange={this.onInputChange}
            onKeyPress={this.onKeyPress}
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