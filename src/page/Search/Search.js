import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { VictimIdKeyboard } from 'component';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
});

export default class Search extends Component {

  static displayName = 'Search';

  static propTypes = {
    nav: PropTypes.objectOf(PropTypes.func),
  }

  onChange = (victimId) => {
    this.props.nav.push('single', { victimId });
  }

  render() {
    return (
      <View style={sh.viewport}>
        <VictimIdKeyboard onChange={this.onChange} />
      </View>
    );
  }
}
