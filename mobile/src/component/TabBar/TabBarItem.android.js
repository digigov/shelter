import React, { PropTypes } from 'react';
import {
  TouchableNativeFeedback,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import ImageSourcePropType from 'ImageSourcePropType';
import ColorPropType from 'ColorPropType';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    marginTop: 4,
    fontSize: 12,
  },
});

function TabBarItemAndroid({ title, icon, selected, onPress, tintColor, unselectedTintColor }) {
  const selectedColor = selected ? tintColor : unselectedTintColor;

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={sh.viewport}>
        <Image source={icon} style={[sh.icon, { tintColor: selectedColor }]} />
        <Text style={[sh.text, { color: selectedColor }]}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

TabBarItemAndroid.propTypes = {
  title: PropTypes.string,
  icon: ImageSourcePropType,
  selected: PropTypes.bool,
  badge: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onPress: PropTypes.func,
  tintColor: ColorPropType,
  unselectedTintColor: ColorPropType,
};

TabBarItemAndroid.defaultProps = {
  onPress: () => {},
};

export default TabBarItemAndroid;
