'use strict';

import React, {
  View,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  Modal,
  Picker,
  TouchableOpacity,
  Component,
  Dimensions,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import moment from 'moment';
import Store from 'react-native-store';
import Icon from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-camera';
import InputType from '../components/InputType';
import InputNote from '../components/InputNote';
import Dialog from '../components/Dialog';
import { verifyVictimId, verifyTaiwanId } from '../lib/verification';

const record = Store.model('record');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class extends Component {

  state = {
    inputType: '其他',
    inputNote: '',
    inputNoteTemp: '',
    isShowNote: false,
  };

  render() {
    const {
      inputType,
      inputNote,
      inputNoteTemp,
      isShowNote,
    } = this.state;

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        paddingTop: 64,
        paddingBottom: 50,
      }}>
        <InputType
          value={inputType}
          onChange={(inputType) => this.setState({ inputType })}
        />
        <InputNote
          value={inputNote}
          isShowEditer={false}
          onEditer={() => this.setState({ isShowNote: true, inputNoteTemp: inputNote })}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#1abc9c',
            backgroundColor: '#16a085',
            margin: 8,
            paddingTop: 3,
            paddingBottom: 1,
          }}
          onPress={() => Actions.batchScan({ inputType, inputNote })}
        >
          <Icon
            name="ios-barcode-outline"
            color="#FEFEFE"
            size={24}
          />
          <Text style={{ paddingBottom: 3, paddingLeft: 5, color: '#FEFEFE' }}>開始</Text>
        </TouchableOpacity>
        <Dialog
          isShow={isShowNote}
          title="編輯細節"
          leftText="取消"
          onLeftPress={() => this.setState({ isShowNote: false, inputNote: inputNoteTemp })}
          rightText="完成"
          onRightPress={() => this.setState({ isShowNote: false })}
        >
          <InputNote
            value={inputNote}
            onChange={(inputNote) => this.setState({ inputNote })}
            isShowEditer={true}
          />
        </Dialog>
      </View>
    );
  }
}