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

import moment from 'moment';
import Store from 'react-native-store';
import Icon from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-camera';
import InputType from '../components/InputType';
import InputNote from '../components/InputNote';
import Dialog from '../components/Dialog';
import { verifyVictimId, verifyTaiwanId } from '../lib/verification';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 64,
    paddingBottom: 50,
  },
});

const record = Store.model('record');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class extends Component {

  state = {
    inputId: '',
    inputType: '其他',
    inputNote: '',
    inputNoteTemp: '',
    isModalVisible: false,
    isTaiwanId: false,
    isVictimId: false,
    isShowNote: false,
    dataSource: ds.cloneWithRows([]),
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.inputId !== this.props.inputId ||
      nextProps.inputIdTimestamp !== this.props.inputIdTimestamp
    ) {
      this.onInputChange(nextProps.inputId);
    }
  }

  onCleanPress = () => {
    this.onInputChange('');
  };

  onInputChange = (inputId) => {
    let isTaiwanId = false;
    let isVictimId = false;
    inputId = inputId.toUpperCase();

    if (verifyTaiwanId(inputId)) {
      isTaiwanId = true;

      record.find({where: {taiwanId: inputId}}).then(results => {
        this.setState({ dataSource: ds.cloneWithRows(results || []) });
      });
    } else if (verifyVictimId(inputId)) {
      isVictimId = true;

      record.find({where: {victimId: inputId}}).then(results => {
        this.setState({ dataSource: ds.cloneWithRows(results || []) });
      });
    } else {
      this.setState({ dataSource: ds.cloneWithRows([]) })
    }


    this.setState({ inputId, isTaiwanId, isVictimId });
  };

  onInsertCancel = () => {
    if (!this.state.isShowNote) {
      this.setState({ isModalVisible: false });
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
    } = this.state;

    if (!this.state.isShowNote) {
      record.add({
        taiwanId: isTaiwanId ? inputId : '',
        victimId: isVictimId ? inputId : '',
        type: inputType,
        note: inputNote,
        createdAt: moment().toISOString(),
      });

      this.setState({ isModalVisible: false });
    } else {
      this.setState({ isShowNote: false });
    }
  };

  renderHeader = () => {
    const {
      isTaiwanId,
      isVictimId,
    } = this.state;

    if (isTaiwanId || isVictimId) {
      return <TouchableOpacity
        onPress={() => this.setState({ isModalVisible: true })}
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
      const textStyle = {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 10,
      };

      return (
        <View>
          <Text style={textStyle}>請輸入正確的</Text>
          <Text style={textStyle}>災民證號</Text>
          <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>或</Text>
          <Text style={textStyle}>身分證證號</Text>
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

  renderRow = (item) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 5,
        }}
      >
        <Text style={{
          fontSize: 26,
          padding: 6,
          paddingLeft: 8,
          paddingTop: 8,
          borderColor: '#131313',
          borderWidth: 1,
        }}>{item.type}</Text>
        <View style={{
          flex: 1,
          padding: 2,
          paddingLeft: 10,
        }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              overflow: 'hidden',
            }}
          >{item.note}</Text>
          <Text style={{
            flex: 1,
            fontSize: 12,
            textAlign: 'right',
            marginTop: 3,
          }}>- {moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</Text>
        </View>
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
      isModalVisible,
    } = this.state;

    return (
      <View style={styles.container}>
        <View
          style={{
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
            onPress={this.onCleanPress}
            name="ios-close-outline"
            backgroundColor="#F5FCFF"
            color="#000"
            width={36}
            size={24}
          />
        </View>
        <ListView
          style={{
            flex: 1,
          }}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          dataSource={dataSource}
          renderRow={this.renderRow}
        />
        <Dialog
          isShow={isModalVisible}
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