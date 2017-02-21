import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { Label } from 'component';

const Touchable = Platform.select({
  ios: () => TouchableOpacity,
  android: () => TouchableNativeFeedback,
})();

const sh = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
});

export default class Item extends Component {

  static displayName = 'Item';

  static propTypes = {
    label: PropTypes.string,
    tip: PropTypes.string,
    children: PropTypes.node,
    style: View.propTypes.style,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    isFirst: false,
  }

  render() {
    const { label, tip, children, style, onPress } = this.props;

    return (
      <Touchable onPress={onPress} disabled={!onPress}>
        <View style={[sh.container, style]}>
          <View style={sh.content}>
            <Label style={sh.label}>{label}</Label>
            {tip && <Text>{tip}</Text>}
          </View>
          {children && <View>{children}</View>}
        </View>
      </Touchable>
    );
  }
}
