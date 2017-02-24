import React, { PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import color from '../../assist/color';

const sh = StyleSheet.create({
  viewport: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '200',
    color: color.text,
  },
});

function Component({ children, color: textColor, style }) {
  return (
    <View style={[sh.viewport, style]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[sh.text, { color: textColor }]}
      >
        {children}
      </Text>
    </View>
  );
}

Component.displayName = 'Label';

Component.propTypes = {
  color: PropTypes.string,
  style: View.propTypes.style,
  children: PropTypes.string.isRequired,
};

Component.defaultProps = {
  color: color.text,
  style: null,
};

export default Component;
