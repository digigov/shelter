/* eslint import/no-unresolved: [2, { ignore: ["ColorPropType"] }] */

import React, { PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import color from '../../assist/color';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    padding: size.font.label / 3,
  },
  text: {
    color: color.secondary,
  },
});

function Component({ children, style, size: fontSize, onPress, ...props }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={[sh.viewport, style]}>
        <Text {...props} style={[sh.text, { fontSize }]} >{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

Component.displayName = 'TextButton';

Component.propTypes = {
  children: PropTypes.string.isRequired,
  style: View.propTypes.style,
  size: PropTypes.number,
  onPress: PropTypes.func,
};

Component.defaultProps = {
  style: null,
  onPress: null,
  size: size.font.label,
};

export default Component;
