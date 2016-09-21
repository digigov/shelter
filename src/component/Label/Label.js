import React, { PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ColorPropType from 'ColorPropType';
import color from 'color';

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

function Label({ children, textColor, style }) {
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

Label.displayName = 'Label';

Label.propTypes = {
  textColor: ColorPropType,
  style: View.propTypes.style,
  children: PropTypes.string,
};

export default Label;
