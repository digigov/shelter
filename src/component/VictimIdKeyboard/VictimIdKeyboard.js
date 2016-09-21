import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import map from 'lodash/map';
import range from 'lodash/range';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { getPrefix } from 'VictimId';
import color from 'color';
import { Icon } from 'component';

const BUTTON_SIZE = 70;
const BUTTON_SPACING = 15;

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: BUTTON_SIZE * 3 + BUTTON_SPACING * 4,
    height: BUTTON_SIZE * 4 + BUTTON_SPACING * 4,
    paddingLeft: BUTTON_SPACING,
    paddingTop: BUTTON_SPACING,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: color.textAssist,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: BUTTON_SPACING,
    marginBottom: BUTTON_SPACING,
  },
  buttonText: {
    fontSize: 32,
    color: color.textAssist,
  },
  input: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 36,
    color: color.textAssist,
  },
  break: {
    position: 'absolute',
    right: 0,
    bottom: -BUTTON_SPACING,
  },
});

export default class IdentificationKeyboard extends Component {

  static displayName = 'IdentificationKeyboard';

  state = {
    input: '',
    prefix: false,
  }

  componentWillMount() {
    const { numberKeyboard, prefixKeyboard, renderKeyBoard } = this;

    this.numberKeyboard = map(numberKeyboard, renderKeyBoard);
    this.prefixKeyboard = mapValues(prefixKeyboard, v => renderKeyBoard(String.fromCharCode(v)));
    this.breakKeyboard = this.renderKeyBoard('break');
  }

  onButtonPress = (keyValue) => {
    const { input: prevInput } = this.state;

    let input;
    switch (keyValue) {
      case 'break':
        input = prevInput.substr(0, prevInput.length - 1);
        break;
      case 'scan':
        break;
      default:
        input = prevInput + keyValue;
    }

    if (input.length > 9) return;

    const propose = getPrefix(input);

    let prefix = false;
    if (propose !== false) {
      prefix = map(propose, ({ key }) => this.prefixKeyboard[key]);
    }

    this.setState({ input, prefix });
  }

  numberKeyboard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'scan', '0'];
  prefixKeyboard = keyBy(range(65, 91), v => String.fromCharCode(v));
  breakKeyboard = undefined;

  renderKeyBoard = (key) => {
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
    const { input, prefix } = this.state;

    return (
      <View style={sh.viewport}>
        <View>
          <View style={sh.input}>
            <Text style={sh.inputText}>{input}</Text>
          </View>
          <View style={sh.keyboard}>
            {prefix || this.numberKeyboard}
          </View>
          <View style={sh.break}>
            {this.breakKeyboard}
          </View>
        </View>
      </View>
    );
  }
}
