import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-native';
import { VictimIdKeyboard, NavigationView } from 'component';

export default class Swirls extends Component {

  static displayName = 'Swirls';

  static propTypes = {
    nav: PropTypes.objectOf(PropTypes.func),
    route: PropTypes.shape({
      type: PropTypes.string,
      note: PropTypes.string,
    }),
  }

  onChange = (text) => {
    const { route: { type } } = this.props;
    Alert.alert(`新增${type}成功`, `${text}`);
  }

  render() {
    const { nav, route: { type } } = this.props;

    return (
      <NavigationView title={`新增 ${type}`} onLeftPress={nav.pop}>
        <VictimIdKeyboard onChange={this.onChange} />
      </NavigationView>
    );
  }
}
