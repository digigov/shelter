'use strict';

import React, {
  View,
  ScrollView,
  Alert,
  Text,
  ListView,
  Modal,
  Picker,
  TouchableOpacity,
  Component,
  Dimensions,
  Linking,
} from 'react-native';

import {
  Button,
} from '../components';

import {
  RNMail as Mailer,
} from 'NativeModules';

import Zlib from 'zlibjs';

import moment from 'moment';
import Store from 'react-native-store';
import Icon from 'react-native-vector-icons/Ionicons';
import { getUniqueID } from 'react-native-device-info';

global.Buffer = global.Buffer || require('buffer').Buffer

const record = Store.model('record');
const victim = Store.model('victim');

export default class extends Component {

  record = [];

  victim = [];

  state = {
    recordLength: 0,
    victimLength: 0,
  };

  componentDidMount() {
    record.find().then(results => {
      this.record = results || [];
      this.setState({ recordLength: this.record.length });
    });
    victim.find().then(results => {
      this.victim = results || [];
      this.setState({ victimLength: this.victim.length });
    });
  }

  headeEmail(body, title) {
    Mailer.mail({
      recipients: ['yuting1987@gmail.com'],
      subject: title || '災民證',
      body: body || '',
    }, (error, event) => {
      if(error) Alert.alert('Error', '電子郵件失敗，請聯繫開發人員');
    });
  }

  headeJsonToBase64(data) {
    data = JSON.stringify(data);

    return Zlib.deflateSync(new Buffer(data)).toString('base64');
  }

  onExportRecord = () => {
    this.headeEmail(this.headeJsonToBase64({
      deviceId: getUniqueID(),
      updatedAt: moment().toISOString(),
      record: this.record || [],
    }), '災民證使用紀錄');
  };

  onExportVictim = () => {
    this.headeEmail(this.headeJsonToBase64({
      deviceId: getUniqueID(),
      updatedAt: moment().toISOString(),
      record: this.victim || [],
    }), '災民證登錄數據');
  };

  render() {
    const {
      recordLength,
      victimLength,
    } = this.state;

    return (
      <ScrollView style={{
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 64,
        paddingBottom: 50,
      }}>
        <Text style={{
          paddingTop: 10,
          paddingLeft: 10, 
          fontSize: 18,
        }}>災民「紀錄」筆數：{recordLength}</Text>
        <View style={{
          flexDirection: 'row',
        }}>
          <Button
            style={{ flex: 2 }}
            labelStyle={{ fontSize: 14 }}
            icon="ios-cloud-upload-outline"
            label="匯出"
            onPress={this.onExportRecord} />
          <Button
            style={{ flex: 2 }}
            labelStyle={{ fontSize: 14 }}
            icon="ios-cloud-download-outline"
            label="匯入" />
          <Button
            style={{
              flex: 3,
              borderColor: '#e74c3c',
              backgroundColor: '#c0392b',
            }}
            labelStyle={{ fontSize: 14 }}
            icon="ios-trash-outline"
            label="清除本機"
            onPress={() => {
              Alert.alert('確定清除紀錄？', null, [
                {text: '取消'},
                {text: '刪除', onPress: () => {
                  record.remove();
                  this.setState({ recordLength: 0 });
                }},
              ]);
            }} />
        </View>
        <Text style={{
          paddingLeft: 10,
          paddingTop: 10,
          fontSize: 18,
        }}>災民「登錄」筆數：{victimLength}</Text>
        <View style={{
          flexDirection: 'row',
        }}>
          <Button
            style={{ flex: 2 }}
            labelStyle={{ fontSize: 14 }}
            icon="ios-cloud-upload-outline"
            label="匯出"
            onPress={this.onExportVictim} />
          <Button
            style={{ flex: 2 }}
            labelStyle={{ fontSize: 14 }}
            icon="ios-cloud-download-outline"
            label="匯入" />
          <Button
            style={{
              flex: 3,
              borderColor: '#e74c3c',
              backgroundColor: '#c0392b',
            }}
            labelStyle={{ fontSize: 14 }}
            icon="ios-trash-outline"
            label="清除本機"
            onPress={() => {
              Alert.alert('確定清除登錄？', null, [
                {text: '取消'},
                {text: '刪除', onPress: () => {
                  victim.remove();
                  this.setState({ victimLength: 0 });
                }},
              ]);
            }} />
        </View>
      </ScrollView>
    );
  }
}