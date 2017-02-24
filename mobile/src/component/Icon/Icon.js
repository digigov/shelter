import React, { Component, PropTypes } from 'react';
import { Platform, Text, View } from 'react-native';
import concat from 'lodash/concat';
import size from '../../assist/size';
import material from './material';
import custom from './custom';

const IconNamePropType = PropTypes.oneOf(
  concat(Object.keys(material), Object.keys(custom))
);

export default class Icon extends Component {
  static propTypes = {
    name: IconNamePropType.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
    style: Text.propTypes.style,
  };

  static defaultProps = {
    size: size.text,
  };

  setNativeProps = (nativeProps) => this._root.setNativeProps(nativeProps);

  render() {
    const { name, size: fontSize, color, style, ...props } = this.props;

    let glyph = '?';
    let fontFamily;

    if (material[name]) {
      glyph = String.fromCharCode(material[name]);
      fontFamily = Platform.select({
        ios: 'Material Icons',
        android: 'MaterialIcons',
      });
    }

    if (custom[name]) {
      glyph = String.fromCharCode(custom[name]);
      fontFamily = 'CustomIcons';
    }

    props.style = [{
      color,
      fontSize,
      fontFamily,
      fontWeight: 'normal',
      fontStyle: 'normal',
    }, style];

    return (<Text ref={component => this._root = component} {...props}>{glyph}</Text>);
  }
}
