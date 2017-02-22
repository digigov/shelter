import React, { PropTypes } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Label } from 'component';
import size from 'size';

const sh = StyleSheet.create({
  viewport: {
    padding: size.font.label / 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 5,
  },
});

function Component({ children, style, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={[sh.viewport, style]}>
        <Icon name="chevron-left" size={size.font.label} />
        {children && <Label style={sh.label}>{children}</Label>}
      </View>
    </TouchableOpacity>
  );
}

Component.displayName = 'BackButton';

Component.propTypes = {
  children: PropTypes.string,
  style: View.propTypes.style,
  onPress: PropTypes.func,
};

export default Component;
