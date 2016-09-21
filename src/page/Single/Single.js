import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'component';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
});

export default class Single extends Component {

  static displayName = 'Single';

  static propTypes = {
    route: PropTypes.shape({
      victimId: PropTypes.string,
    }),
  }

  onAddPress = () => {
  }

  render() {
    const { route: { victimId } } = this.props;

    return (
      <View style={sh.viewport}>
        <Title>{victimId}</Title>
      </View>
    );
  }
}
