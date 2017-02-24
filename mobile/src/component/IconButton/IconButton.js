import React, { PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '../Icon/Icon';
import color from '../../assist/color';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    borderWidth: 1,
    borderColor: color.text,
    borderRadius: size.font.label,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: 'transparent',
  },
});

function Component({ name, color: iconColor, size: iconSize, style, onPress }) {
  return (
    <TouchableOpacity
      style={[
        sh.viewport,
        style,
        { width: iconSize * 1.6, height: iconSize * 1.6 },
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <Icon
        name={name}
        color={iconColor}
        size={iconSize}
        style={sh.icon}
      />
    </TouchableOpacity>
  );
}

Component.displayName = 'IconButton';

Component.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  style: View.propTypes.style,
  onPress: PropTypes.func,
};

Component.defaultProps = {
  color: color.text,
  size: size.font.label,
  style: null,
  onPress: null,
};

export default Component;
