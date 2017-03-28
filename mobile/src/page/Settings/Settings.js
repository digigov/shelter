import _ from 'lodash';
import React, { PropTypes } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { gql, withApollo } from 'react-apollo';
import { NextButton, Label, Input, Item, IconButton, TextButton } from '../../component';
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
  box: {
    flex: 1,
  },
  server: {
    marginTop: 10,
    borderBottomWidth: 0,
  },
  legend: {
    paddingVertical: 0,
    borderBottomColor: color.border,
    borderBottomWidth: 1,
    marginTop: 20,
  },
  textbutton: {
    paddingRight: 0,
  },
  item: {
    paddingVertical: 0,
  },
});

export class Component extends React.Component {

  static displayName = 'Settings';

  static propTypes = {
    navigator: PropTypes.shape().isRequired,
    client: PropTypes.shape().isRequired,
    citizen: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    onClientChange: PropTypes.func.isRequired,
    onCitizenChange: PropTypes.func.isRequired,
  }

  state = {
    uri: '',
  }

  componentWillMount() {
    const { client } = this.props;
    const uri = _.get(client, 'uri', '');

    this.setState({ uri });
  }

  onBack = () => this.props.navigator.pop();

  onUriChange = uri => this.setState({ uri });

  onSubmit = async () => {
    const { client, onClientChange, onCitizenChange } = this.props;
    await onClientChange(this.state.uri);
    const reply = await client.query(
      { query: gql`query { citizen { citizenId fullname } }` },
    );
    onCitizenChange(_.map(reply.data.citizen, item => ([item.citizenId, item.fullname])));
    this.props.navigator.replacePreviousAndPop({ id: 'menu' });
  }

  render() {
    const { citizen } = this.props;
    const { uri } = this.state;

    return (
      <View style={sh.viewport}>
        <View style={[sh.header, sh.margin]}>
          <Label>設置</Label>
          <IconButton name="clear" onPress={this.onBack} />
        </View>
        <View style={sh.margin}>
          <Item style={[sh.legend, sh.server]} label="伺服器 URI">
            <TextButton style={sh.textbutton} size={size.font.note}>掃描 QRCode 取得 URI</TextButton>
          </Item>
          <Input autoFocus value={uri} onChange={this.onUriChange} />
        </View>
        <ScrollView style={sh.box}>
          <View style={sh.margin}>
            <Item style={sh.legend} label="臨時證號配額">
              <TextButton style={sh.textbutton} size={size.font.note}>取得更多臨時證號</TextButton>
            </Item>
            <Item label="剩餘" style={sh.item}><Text>0筆</Text></Item>
            <Item label="已使用" style={sh.item}><Text>0筆</Text></Item>
            <Item label="使用率" style={sh.item}><Text>0%</Text></Item>
          </View>
          <View style={sh.margin}>
            <Item style={sh.legend} label="核可名單">
              <TextButton style={sh.textbutton} size={size.font.note}>更新核可名單</TextButton>
            </Item>
            <Item label="總數量" style={sh.item}><Text>{citizen.length}筆</Text></Item>
          </View>
          <View style={sh.margin}>
            <Item style={sh.legend} label="登錄狀態">
              <TextButton style={sh.textbutton} size={size.font.note}>重試上傳資料</TextButton>
            </Item>
            <Item label="已登錄" style={sh.item}><Text>0筆</Text></Item>
            <Item label="等待上傳" style={sh.item}><Text>0筆</Text></Item>
          </View>
        </ScrollView>
        <View style={sh.margin}>
          <NextButton onPress={this.onSubmit}>儲存</NextButton>
        </View>
      </View>
    );
  }
}

export default withApollo(Component);
