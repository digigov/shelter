import React, { PropTypes } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import color from '../../assist/color';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    borderColor: color.border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: size.font.text,
  },
});

function Component({ style, onChange, ...props }) {
  return (
    <View style={[sh.viewport, style]}>
      <TextInput
        multiline
        style={sh.input}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  );
}

Component.displayName = 'Textarea';

Component.propTypes = {
  style: View.propTypes.style,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Component.defaultProps = {
  style: null,
};

export default Component;
