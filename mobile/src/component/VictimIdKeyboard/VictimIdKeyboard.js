import React, { PropTypes, Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Alert } from 'react-native';
import { Icon } from 'component';
import map from 'lodash/map';
import range from 'lodash/range';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import chunk from 'lodash/chunk';
import { getPrefix } from 'VictimId';
import color from 'color';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  keyboard: {
    borderRightWidth: 1,
    borderRightColor: color.textAssist,
    borderBottomWidth: 1,
    borderBottomColor: color.textAssist,
  },
  button: {
    flex: 1,
    height: 70,
    borderLeftWidth: 1,
    borderLeftColor: color.textAssist,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    borderTopWidth: 1,
    borderTopColor: color.textAssist,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 32,
    color: color.textAssist,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 36,
    color: color.textAssist,
  },
  preholder: {
    fontSize: 32,
    color: color.textAssist,
  },
  tip: {
    fontSize: 16,
    color: color.textAssist,
    marginTop: 5,
  },
});

export default class VictimIdKeyboard extends Component {

  static displayName = 'VictimIdKeyboard';

  static propTypes = {
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: () => {},
  }

  state = {
    input: '',
    prefixKeyboard: [],
  }

  componentWillMount() {
    const { numberKeyboard, prefixKeyboard, renderButton } = this;

    this.numberKeyboard = map(numberKeyboard, renderButton);
    this.prefixKeyboard = mapValues(prefixKeyboard, v => renderButton(String.fromCharCode(v)));
  }

  onButtonPress = (keyValue) => {
    const { onChange } = this.props;
    const { input: prevInput } = this.state;

    let input = '';
    if (keyValue === 'break') {
      input = prevInput.substr(0, prevInput.length - 1);
    } else if (keyValue === 'scan') {
      Alert.alert('Info', '功能尚未開啟');
    } else if (/[A-Z]/gi.test(keyValue)) {
      onChange(`${keyValue}${prevInput}`);
    } else {
      input = prevInput + keyValue;
    }

    if (input.length > 9) return;

    const prefixKeyboard = map(getPrefix(input), ({ key }) => this.prefixKeyboard[key]);

    if (prefixKeyboard.length % 3 > 0) {
      range(3, prefixKeyboard.length % 3).forEach(
        (key) => prefixKeyboard.push(<View key={key} style={sh.button} />)
      );
    }

    this.setState({ input, prefixKeyboard });
  }

  numberKeyboard = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  prefixKeyboard = keyBy(range(65, 91), v => String.fromCharCode(v));

  renderButton = (key) => {
    let display;
    switch (key) {
      case 'break':
        display = <Icon name="replay" size={30} color={color.textAssist} />;
        break;
      case 'scan':
        display = <Icon name="filter-center-focus" size={30} color={color.textAssist} />;
        break;
      default:
        display = <Text style={sh.buttonText}>{key}</Text>;
    }

    return (
      <TouchableHighlight
        key={key}
        underlayColor={color.backgroundAssist}
        onPress={() => this.onButtonPress(key)}
        style={sh.button}
      >
        {display}
      </TouchableHighlight>
    );
  }

  render() {
    const { input, prefixKeyboard } = this.state;

    const isPrefix = input && input.length >= 9;

    return (
      <View style={sh.viewport}>
        <View style={sh.input}>
          <Text style={sh.inputText}>{input}</Text>
          {!input && <Text style={sh.preholder}>災民證 或 身分證</Text>}
          {!input && <Text style={sh.tip}>請輸入證件字號後九位數字</Text>}
        </View>
        <View style={sh.keyboard}>
          {isPrefix && prefixKeyboard.length ?
            map(chunk(prefixKeyboard, 3), (buttons, idx) => (
              <View style={sh.buttonGroup} key={idx}>{buttons}</View>
            ))
          :
            map(chunk(this.numberKeyboard, 3), (buttons, idx) => (
              <View style={sh.buttonGroup} key={idx}>{buttons}</View>
            ))
          }
          <View style={sh.buttonGroup} key="toolbar">
            {this.renderButton('scan')}
            {isPrefix && prefixKeyboard.length ?
              <View style={sh.button} />
            :
              this.renderButton('0')
            }
            {this.renderButton('break')}
          </View>
        </View>
      </View>
    );
  }
}
