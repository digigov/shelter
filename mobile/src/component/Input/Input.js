import React, { PropTypes } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from '../Icon/Icon';
import size from '../../assist/size';
import color from '../../assist/color';

const sh = StyleSheet.create({
  viewport: {
    flexDirection: 'row',
    borderColor: color.border,
    borderWidth: 1,
    borderRadius: 5,
    height: size.input,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: size.input,
  },
  icon: {
    width: 32,
    height: size.input,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconViewport: {
    paddingLeft: 0,
  },
});

function Component({ style, icon, onChange, ...props }) {
  return (
    <View style={[sh.viewport, icon && sh.iconViewport, style]}>
      {icon &&
        <View style={sh.icon}>
          <Icon name={icon} size={20} color={color.border} />
        </View>
      }
      <TextInput
        style={sh.input}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  );
}

Component.displayName = 'Input';

Component.propTypes = {
  style: View.propTypes.style,
  icon: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Component;
