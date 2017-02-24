import React, { Component, PropTypes } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { IconButton, Title, Label, Margin, NextButton, Input, Textarea } from '../../component';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    paddingTop: size.statusBar,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  inputBox: {
    flex: 1,
  },
});

export default class Panel extends Component {

  static displayName = 'Panel';

  static propTypes = {
    navigator: PropTypes.shape().isRequired,
    route: PropTypes.shape({
      action: PropTypes.string,
      victimId: PropTypes.string,
    }).isRequired,
  }

  state = {
    fullname: '',
    phoneNumber: '',
    detail: '',
  }

  onBack = () => this.props.navigator.pop();

  onSubmit = () => {
    const { route: { victimId } } = this.props;

    Alert.alert(
      '儲存完成', victimId,
      [{
        text: 'OK',
        onPress: () => this.props.navigator.pop(),
      }],
    );
  }

  onFullnameChange = fullname => this.setState({ fullname });

  onPhoneNumberChange = phoneNumber => this.setState({ phoneNumber });

  onDetailChange = detail => this.setState({ detail });

  renderInput = () => {
    const { route: { action, victimId } } = this.props;
    const { fullname, phoneNumber, detail } = this.state;

    if (action === '登錄災民') {
      return (
        <ScrollView style={sh.inputBox}>
          <Margin style={sh.inputBox}>
            <Title>{victimId}</Title>
            <Label>姓名</Label>
            <Input autoFocus value={fullname} onChange={this.onFullnameChange} />
            <Label>聯絡電話</Label>
            <Input keyboardType="phone-pad" value={phoneNumber} onChange={this.onPhoneNumberChange} />
          </Margin>
        </ScrollView>
      );
    }

    return (
      <Margin style={sh.inputBox}>
        <Title>{victimId}</Title>
        <Label>細節補充（選填）</Label>
        <Textarea autoFocus value={detail} onChange={this.onDetailChange} />
      </Margin>
    );
  }

  render() {
    const { route: { action } } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={sh.viewport}>
        <Margin style={sh.header}>
          <Label>{action}</Label>
          <IconButton name="clear" onPress={this.onBack} />
        </Margin>
        {this.renderInput()}
        <Margin>
          <NextButton onPress={this.onSubmit}>送出</NextButton>
        </Margin>
      </KeyboardAvoidingView>
    );
  }
}
