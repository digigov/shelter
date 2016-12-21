import React, { PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import color from 'color';
import size from 'size';

const sh = StyleSheet.create({
  viewport: {
    padding: size.font.label / 3,
  },
  text: {
    color: color.secondary,
    fontSize: size.font.label,
  },
});

function TextButton({ children, style, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={[sh.viewport, style]}>
        <Text style={sh.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
}

TextButton.displayName = 'TextButton';

TextButton.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  style: View.propTypes.style,
  onPress: PropTypes.func,
};

export default TextButton;
