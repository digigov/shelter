import React, { PropTypes, Component } from 'react';
import { StyleSheet, View } from 'react-native';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    marginHorizontal: size.margin,
  },
});

export default class Margin extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    style: View.propTypes.style,
  }

  static defaultProps = {
    shouldUpdate: true,
    style: null,
  }

  shouldComponentUpdate(nextProps: Object) {
    return !!nextProps.shouldUpdate;
  }

  render() {
    const { children, style } = this.props;

    return (<View style={[sh.viewport, style]}>{children}</View>);
  }
}
