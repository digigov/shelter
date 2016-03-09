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

import Store from 'react-native-store';
import Icon from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-camera';
import Record from '../lib/Record';
import { verifyVictimId, verifyTaiwanId } from '../lib/verification';

import {
  Dialog,
  InputId,
  InputType,
  InputNote,
  RecordRow,
} from '../components'

const record = Store.model('record');
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => true,
});

export default class extends Component {

  state = {
    inputId: '',
    inputType: '其他',
    inputNote: '',
    inputNoteTemp: '',
    isInsertVisible: false,
    isTaiwanId: false,
    isVictimId: false,
    isShowNote: false,
    dataSource: ds.cloneWithRows([]),
  };

  dataSource = [];

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.inputId !== this.props.inputId ||
      nextProps.inputIdTimestamp !== this.props.inputIdTimestamp
    ) {
      this.onInputChange(nextProps.inputId);
    }
  }

  updateDataSource(data) {
    this.dataSource = data;
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.dataSource) });
  }

  onInputChange = (inputId) => {
    let isTaiwanId = false;
    let isVictimId = false;
    inputId = inputId.toUpperCase();

    if (verifyTaiwanId(inputId)) {
      isTaiwanId = true;

      Record.find({taiwanId: inputId}).then(results => this.updateDataSource(results || []));
    } else if (verifyVictimId(inputId)) {
      isVictimId = true;

      Record.find({victimId: inputId}).then(results => this.updateDataSource(results || []));
    } else {
      this.updateDataSource([]);
    }

    this.setState({ inputId, isTaiwanId, isVictimId });
  };

  onInsertCancel = () => {
    if (!this.state.isShowNote) {
      this.setState({ isInsertVisible: false });
    } else {
      this.setState({ isShowNote: false, inputNote: this.state.inputNoteTemp });
    }
  };

  onInsertSubmit = () => {
    const {
      isTaiwanId,
      isVictimId,
      inputId,
      inputType,
      inputNote,
      dataSource,
    } = this.state;

    if (!this.state.isShowNote) {
      Record
        .insert({
          taiwanId: isTaiwanId ? inputId : '',
          victimId: isVictimId ? inputId : '',
          type: inputType,
          note: inputNote,
        })
        .then(obj => {
          this.dataSource.unshift(obj);
          this.setState({ 
            dataSource: dataSource.cloneWithRows(this.dataSource),
            isInsertVisible: false,
          });
        })
    } else {
      this.setState({ isShowNote: false });
    }
  };

  onRemove = (data) => {
    Record.removeById(data._id);

    this.updateDataSource(this.dataSource.filter(item => item._id !== data._id));
  };

  renderHeader = () => {
    const {
      isTaiwanId,
      isVictimId,
    } = this.state;

    if (isTaiwanId || isVictimId) {
      return <TouchableOpacity
        onPress={() => this.setState({ isInsertVisible: true })}
        style={{
          height: 42,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          name="ios-plus"
          size={24}
          style={{ marginRight: 8 }}
        />
        <Text style={{
          fontSize: 24,
        }}>新增一筆新記錄</Text>
      </TouchableOpacity>;
    } else {
      return (
        <View>
          <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>請輸入正確的</Text>
          <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 10 }}>災民證字號</Text>
          <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>或</Text>
          <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 10 }}>身分證字號</Text>
        </View>
      );
    }
  };

  renderFooter = () => {
    const {
      isTaiwanId,
      isVictimId,
    } = this.state;

    return (isTaiwanId || isVictimId) ? <Text style={{
      color: '#959C9F',
      textAlign: 'center',
      marginTop: 20,
    }}>下方已無更多紀錄</Text> : null;
  };

  renderDialog = () => {
    const {
      inputType,
      inputNote,
      isShowNote,
    } = this.state;

    return (
      <View style={{
        flex: 1,
      }}>
        { !isShowNote && <InputType
          value={inputType}
          onChange={(inputType) => this.setState({ inputType })}
        /> }
        <InputNote
          value={inputNote}
          onChange={(inputNote) => this.setState({ inputNote })}
          isShowEditer={isShowNote}
          onEditer={() => this.setState({ isShowNote: true })}
        />
      </View>
    );
  };

  render() {
    const {
      inputId,
      isVictimId,
      isTaiwanId,
      isShowNote,
      dataSource,
      isInsertVisible,
    } = this.state;

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 64,
        paddingBottom: 50,
      }}>
        <InputId
          value={inputId}
          onChange={this.onInputChange}
        />
        <ListView
          style={{
            flex: 1,
          }}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          dataSource={dataSource}
          renderRow={(item) => <RecordRow data={item} onRemove={this.onRemove} />}
        />
        <Dialog
          isShow={isInsertVisible}
          title="新增紀錄"
          leftText="取消"
          onLeftPress={this.onInsertCancel}
          rightText={ isShowNote ? '完成' : '新增' }
          onRightPress={this.onInsertSubmit}
        >
          { this.renderDialog() }
        </Dialog>
      </View>
    );
  }
}