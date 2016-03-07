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
import { verifyVictimId, verifyTaiwanId } from '../lib/verification';

export default class extends Component {

  hasRead = false;

  state = {
    inputId: '',
    isTaiwanId: false,
    isVictimId: false,
  };

  componentWillMount() {
    // alert(this.props.route.name);
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

  onInputChange = (inputId) => {
    let isTaiwanId = false;
    let isVictimId = false;
    inputId = inputId.toUpperCase();

    if (verifyTaiwanId(inputId)) {
      isTaiwanId = true;
    } else if (verifyVictimId(inputId)) {
      isVictimId = true;
    }

    this.setState({ inputId, isTaiwanId, isVictimId });
  };

  renderInput = () => {
    const {
      inputId,
    } = this.state;

    return (
      <View
        style={{
          margin: 3,
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextInput
          style={{
            flex: 1,
            borderColor: 'gray',
            borderWidth: 1,
            textAlign: 'center',
          }}
          placeholder="請輸入證件字號"
          autoFocus={true}
          value={inputId}
          onChangeText={this.onInputChange}
        />
        <Icon.Button
          name="code-download"
          backgroundColor="#F5FCFF"
          color="#000"
          width={36}
          size={24}
        />
      </View>
    );
  };

  render() {
    const routeName = this.props.route.name;

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
        { routeName === 'batchScan' && this.renderInput() }
      </View>
    );
  }
}