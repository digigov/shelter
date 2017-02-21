import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { VictimIdKeyboard, BackButton, Label } from 'component';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    paddingTop: size.statusBar,
  },
});

export default class Panel extends Component {

  static displayName = 'Panel';

  static propTypes = {
    navigator: PropTypes.shape(),
    route: PropTypes.shape({
      action: PropTypes.string,
    }),
  }

  onBack = () => this.props.navigator.pop();

  render() {
    const { route: { action } } = this.props;

    return (
      <View style={sh.viewport}>
        <BackButton label={action} onPress={this.onBack} />
        <VictimIdKeyboard onChange={this.onChange} />
      </View>
    );
  }
}
