import React, { PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '../Icon/Icon';
import Label from '../Label/Label';
import color from '../../assist/color';
import size from '../../assist/size';

const sh = StyleSheet.create({
  viewport: {
    alignItems: 'flex-end',
    paddingVertical: 15,
  },
  button: {
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: size.font.label,
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginRight: 5,
  },
});

function Component({ children, icon, color: textColor, style, onPress }) {
  return (
    <View style={sh.viewport}>
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <View style={[sh.button, style]}>
          <Label style={sh.label} color={textColor}>{children}</Label>
          <Icon name={icon} color={textColor} size={size.font.label} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

Component.displayName = 'NextButton';

Component.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  style: View.propTypes.style,
  onPress: PropTypes.func,
};

Component.defaultProps = {
  children: '下一步',
  icon: 'chevron-right',
  color: color.primary,
  style: null,
  onPress: null,
};

export default Component;
