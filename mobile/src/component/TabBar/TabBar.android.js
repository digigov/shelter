import React, { PropTypes, Component } from 'react';
import TabBarItem from './TabBarItem';
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import findIndex from 'lodash/findIndex';
import ColorPropType from 'ColorPropType';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
  },
  bar: {
    height: 3,
    flexDirection: 'row',
  },
  line: {
    height: 3,
  },
});

export default class TabBarAndroid extends Component {

  static displayName = 'TabBarAndroid';

  static propTypes = {
    children: PropTypes.node,
    tintColor: ColorPropType,
    unselectedTintColor: ColorPropType,
  };

  static Item = TabBarItem;

  state = {
    linePos: new Animated.Value(0),
    lineLayout: { width: 0 },
  }

  componentDidUpdate() {
    const { children } = this.props;
    const { linePos } = this.state;

    const idx = findIndex(children, item => item.props.selected);
    Animated.spring(linePos, { toValue: idx }).start();
  }

  onLineLeyout = (e) => this.setState({ lineLayout: e.nativeEvent.layout });

  tabs = [];

  render() {
    const { children, tintColor, unselectedTintColor } = this.props;
    const { linePos, lineLayout } = this.state;

    const tabs = this.tabs;

    React.Children.forEach(children, (item, idx) => {
      if (
        tabs[idx] === undefined ||
        tabs[idx].props.selected !== item.props.selected ||
        tabs[idx].props.badge !== item.props.badge
      ) {
        tabs[idx] = React.cloneElement(item, { tintColor, unselectedTintColor });
      }
    });

    const tabCount = React.Children.count(children);
    const tabWidth = lineLayout.width / tabCount;

    return (
      <View style={sh.viewport}>
        <View style={sh.tab}>{tabs}</View>
        <View style={sh.bar} onLayout={this.onLineLeyout}>
          <Animated.View
            style={[sh.line, {
              width: tabWidth,
              backgroundColor: tintColor,
              transform: [
                { translateX: linePos.interpolate({
                  inputRange: [0, tabCount - 1],
                  outputRange: [0, tabWidth * (tabCount - 1)],
                }) },
              ],
            }]}
          />
        </View>
      </View>
    );
  }
}
