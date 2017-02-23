import React, { PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'component';
import color from 'color';
import defaultSize from 'size';

const sh = StyleSheet.create({
  viewport: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: defaultSize.font.label,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: "transparent",
  },
});

function IconButton({ name, size = defaultSize.font.label, style, onPress }) {
  return (
    <TouchableOpacity style={[
      sh.viewport,
      style,
      { width: size * 1.6, height: size * 1.6 }
    ]} onPress={onPress} disabled={!onPress}>
      <Icon
        name={name}
        color={color.border}
        size={size}
        style={sh.icon}
      />
    </TouchableOpacity>
  );
}

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  style: View.propTypes.style,
  onPress: PropTypes.func,
};

export default IconButton;
