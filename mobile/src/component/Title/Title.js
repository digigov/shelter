import React, { PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ColorPropType from 'ColorPropType';
import color from 'color';

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

function Title({ subtitle, color: textColor, children, style }) {
  return (
    <View style={style}>
      <Text style={[sh.title, { color: textColor }]}>{children}</Text>
      {subtitle && <Text style={sh.subtitle}>{subtitle}</Text>}
    </View>
  );
}

Title.displayName = 'Title';

Title.propTypes = {
  color: ColorPropType,
  style: View.propTypes.style,
  subtitle: PropTypes.string,
  children: PropTypes.string,
};

export default Title;
