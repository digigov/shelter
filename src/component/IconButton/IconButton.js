import React, { PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'component';
import color from 'color';
import size from 'size';

const sh = StyleSheet.create({
  viewport: {
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: size.font.label,
    padding: size.font.label / 3,
  },
});

function IconButton({ name, style, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={[sh.viewport, style]}>
        <Icon name={name} size={size.font.label} />
      </View>
    </TouchableOpacity>
  );
}

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  style: View.propTypes.style,
  onPress: PropTypes.func,
};

export default IconButton;
