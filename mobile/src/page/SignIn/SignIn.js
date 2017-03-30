import _ from 'lodash';
import React, { PropTypes } from 'react';
import { gql, withApollo } from 'react-apollo';
import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Alert, Text } from 'react-native';
import { IconButton, Title, Label, NextButton, Input, Textarea } from '../../component';
import color from '../../assist/color';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    paddingTop: size.statusBar,
  },
  margin: {
    marginHorizontal: size.margin,
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
  warning: {
    color: color.warning,
  },
  name: {
    marginTop: 20,
  },
});

export class Component extends React.Component {

  static displayName = 'Panel';

  static propTypes = {
    navigator: PropTypes.shape().isRequired,
    client: PropTypes.shape().isRequired,
    route: PropTypes.shape({
      action: PropTypes.string,
      victimId: PropTypes.string,
    }).isRequired,
    citizen: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  }

  state = {
    fullname: '',
    phoneNumber: '',
    detail: '',
    isCitizen: false,
  }

  componentWillMount() {
    const { citizen, route: { victimId } } = this.props;
    const reply = citizen.length ? _.find(citizen, item => (item[0] === victimId)) : false;

    this.setState({
      isCitizen: citizen.length ? !!reply : true,
      fullname: reply ? reply[1] : '',
    });
  }

  onBack = () => this.props.navigator.pop();

  onSubmit = async () => {
    const { client, route: { action, victimId } } = this.props;
    const { fullname, phoneNumber, detail } = this.state;

    if (client.uri) {
      if (action === '登錄災民') {
        await client.mutate({
          mutation: gql`
            mutation ($input: CheckinVictimMutationInput!) {
              checkinVictim (input: $input) { isNew }
            }`,
          variables: {
            input: {
              victimId,
              fullname: fullname || null,
              phoneNumber: phoneNumber || null,
            },
          },
        });
      } else {
        await client.mutate({
          mutation: gql`
            mutation ($input: TakeActionMutationInput!) {
              takeAction (input: $input) { isNew }
            }`,
          variables: {
            input: { victimId, action, detail: detail || null },
          },
        });
      }
    }

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
    const { fullname, phoneNumber, detail, isCitizen } = this.state;

    if (action === '登錄災民') {
      return (
        <ScrollView style={sh.inputBox}>
          <View style={[sh.inputBox, sh.margin]}>
            <Title color={isCitizen === false ? color.warning : color.safety}>{victimId}</Title>
            {isCitizen === false && <Text style={sh.warning}>注意！不是核可名單</Text>}
            <Label style={sh.name}>姓名</Label>
            <Input autoFocus value={fullname} onChange={this.onFullnameChange} />
            <Label>聯絡電話</Label>
            <Input keyboardType="phone-pad" value={phoneNumber} onChange={this.onPhoneNumberChange} />
          </View>
        </ScrollView>
      );
    }

    return (
      <View style={[sh.margin, sh.inputBox]}>
        <Title>{victimId}</Title>
        <Label>細節補充（選填）</Label>
        <Textarea autoFocus value={detail} onChange={this.onDetailChange} />
      </View>
    );
  }

  render() {
    const { route: { action } } = this.props;

    return (
      <KeyboardAvoidingView behavior="height" style={sh.viewport}>
        <View style={[sh.header, sh.margin]}>
          <Label>{action}</Label>
          <IconButton name="clear" onPress={this.onBack} />
        </View>
        {this.renderInput()}
        <View style={sh.margin}>
          <NextButton onPress={this.onSubmit}>送出</NextButton>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default withApollo(Component);
