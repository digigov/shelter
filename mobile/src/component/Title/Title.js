import React, { PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import color from '../../assist/color';

const sh = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: color.text,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '200',
    color: color.text,
    marginTop: 5,
  },
});

function Component({ subtitle, color: textColor, children, style }) {
  return (
    <View style={style}>
      <Text style={[sh.title, { color: textColor }]}>{children}</Text>
      {subtitle && <Text style={sh.subtitle}>{subtitle}</Text>}
    </View>
  );
}

Component.displayName = 'Title';

Component.propTypes = {
  color: PropTypes.string,
  style: View.propTypes.style,
  subtitle: PropTypes.string,
  children: PropTypes.string.isRequired,
};

Component.defaultProps = {
  color: color.text,
  style: null,
  subtitle: null,
};

export default Component;
