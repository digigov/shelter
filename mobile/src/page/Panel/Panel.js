import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Keyboard, BackButton } from '../../component';
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

  onChange = (victimId) => {
    const { navigator, route: { action } } = this.props;
    navigator.push({ id: 'signin', action, victimId });
  }

  render() {
    const { route: { action } } = this.props;

    return (
      <View style={sh.viewport}>
        <BackButton onPress={this.onBack}>{action}</BackButton>
        <Keyboard onChange={this.onChange} />
      </View>
    );
  }
}
