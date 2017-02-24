import React, { Component, PropTypes } from 'react';
import { Platform, Text } from 'react-native';
import concat from 'lodash/concat';
import color from '../../assist/color';
import size from '../../assist/size';
import material from './material';
import custom from './custom';

const IconNamePropType = PropTypes.oneOf(
  concat(Object.keys(material), Object.keys(custom)),
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
    color: color.text,
    style: null,
  };

  setNativeProps = nativeProps => this.root.setNativeProps(nativeProps);

  render() {
    const { name, size: fontSize, color: fontColor, style, ...props } = this.props;

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
      color: fontColor,
      fontSize,
      fontFamily,
      fontWeight: 'normal',
      fontStyle: 'normal',
    }, style];

    return (<Text ref={(root) => { this.root = root; }} {...props}>{glyph}</Text>);
  }
}
