'use strict';

import React, {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  ListView,
  Modal,
  Picker,
  Alert,
  TouchableOpacity,
  Component,
  Dimensions,
} from 'react-native';

import {
  Button,
  Input,
  InputId,
} from '../components';

import moment from 'moment';
import Store from 'react-native-store';
import Icon from 'react-native-vector-icons/Ionicons';
import { verifyVictimId, verifyTaiwanId } from '../lib/verification';

const victim = Store.model('victim');

const emptyVictim = {
  inputVictimId: '',
  inputTaiwanId: '',
  inputName: '',
  inputContact: '',
  storeId: null
};

export default class extends Component {

  state = {
    inputId: '',
    inputTaiwanId: '',
    inputVictimId: '',
    inputName: '',
    inputContact: '',
    isTaiwanId: false,
    isVictimId: false,
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.inputId !== this.props.inputId ||
      nextProps.inputIdTimestamp !== this.props.inputIdTimestamp
    ) {
      this.onInputChange(nextProps.inputId);
    }
  }

  onInputChange = (inputId) => {
    let isTaiwanId = false;
    let isVictimId = false;
    inputId = inputId.toUpperCase();

    if (verifyTaiwanId(inputId)) {
      victim.get({where: {taiwanId: inputId}}).then(reply => {
        this.setState(reply ? {
          inputVictimId: reply[0].victimId || '',
          inputTaiwanId: '',
          inputName: reply[0].name || '',
          inputContact: reply[0].contact || '',
          storeId: reply[0]._id || null,
        } : emptyVictim);
      });
      isTaiwanId = true;
    } else if (verifyVictimId(inputId)) {
      victim.get({where: {victimId: inputId}}).then(reply => {
        this.setState(reply ? {
          inputVictimId: '',
          inputTaiwanId: reply[0].taiwanId || '',
          inputName: reply[0].name || '',
          inputContact: reply[0].contact || '',
          storeId: reply[0]._id || null,
        } : emptyVictim);
      });
      isVictimId = true;
    }

    this.setState({
      inputId,
      isTaiwanId,
      isVictimId,
    });
  };

  onSubmit = () => {
    const {
      inputId,
      inputTaiwanId,
      inputVictimId,
      inputName,
      inputContact,
      storeId,
      isVictimId,
      isTaiwanId,
    } = this.state;

    if (storeId) {
      victim.updateById({
        victimId: isVictimId ? inputId : inputVictimId,
        taiwanId: isTaiwanId ? inputId : inputTaiwanId,
        name: inputName,
        contact: inputContact,
        updatedAt: moment().toISOString(),
      }, storeId)
      .then(() => Alert.alert('更新完成', isVictimId ? inputId : inputVictimId));
    } else {
      victim.add({
        victimId: isVictimId ? inputId : inputVictimId,
        taiwanId: isTaiwanId ? inputId : inputTaiwanId,
        name: inputName,
        contact: inputContact,
        updatedAt: moment().toISOString(),
      })
      .then(reply => {
        this.setState({ storeId: reply._id });
        Alert.alert('儲存完成', isVictimId ? inputId : inputVictimId)
      });
    }
  };

  renderInput = () => {
    const {
      inputId,
      inputTaiwanId,
      inputVictimId,
      inputName,
      inputContact,
      isVictimId,
      isTaiwanId,
    } = this.state;

    if (isTaiwanId || isVictimId) {
      return (
        <View>
          {isVictimId && <Input
            label="身份證字號"
            value={inputTaiwanId}
            onChange={inputTaiwanId => this.setState({ inputTaiwanId })}
          />}
          {isTaiwanId && <Input
            label="災民證字號"
            value={inputVictimId}
            onChange={inputVictimId => this.setState({ inputVictimId })}
          />}
          <Input
            label="姓名"
            value={inputName}
            onChange={inputName => this.setState({ inputName })}
          />
          <Input
            label="聯絡電話"
            value={inputContact}
            onChange={inputContact => this.setState({ inputContact })}
          />
          <Button
            label="儲存"
            icon="code-download"
            onPress={this.onSubmit}
            />
        </View>
      );
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

  render() {
    const {
      inputId,
      inputTaiwanId,
      isVictimId,
      isTaiwanId,
    } = this.state;

    return (
      <ScrollView style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F5FCFF',
        paddingTop: 64,
        paddingBottom: 50,
      }}>
        <InputId
          value={inputId}
          onChange={this.onInputChange}
        />
        { this.renderInput() }
      </ScrollView>
    );
  }
}