import React, { PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Label } from 'component';
import color from 'color';
import size from 'size';

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

function NextButton({ children, icon, style, onPress }) {
  return (
    <View style={sh.viewport}>
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <View style={[sh.button, style]}>
          <Label style={sh.label} color={color.primary}>{children || '下一步'}</Label>
          <Icon name={icon || 'chevron-right'} color={color.primary} size={size.font.label} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

NextButton.displayName = 'NextButton';

NextButton.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  style: View.propTypes.style,
  onPress: PropTypes.func,
};

export default NextButton;
