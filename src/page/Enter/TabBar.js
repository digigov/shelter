import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { TabBar } from 'component';
import { search, rapids, center } from './TabBarIcon';
import color from 'color';

const sh = StyleSheet.create({
  viewport: {
    paddingTop: Platform.OS === 'android' ? 3 : 0,
    paddingBottom: Platform.OS === 'ios' ? 5 : 0,
    backgroundColor: color.backgroundAssist,
    borderColor: color.border,
    borderBottomWidth: Platform.OS === 'android' ? 1 : 0,
    position: Platform.OS === 'android' ? 'absolute' : undefined,
    top: 0,
    left: 0,
    right: 0,
  },
});

export default class EnterTabBar extends Component {

  static propTypes = {
    height: PropTypes.number,
    initialSelected: PropTypes.oneOf(['search', 'rapids', 'center']),
    onSelect: PropTypes.func,
    searchBadge: TabBar.Item.propTypes.badge,
    rapidsBadge: TabBar.Item.propTypes.badge,
    centerBadge: TabBar.Item.propTypes.badge,
  }

  static defaultProps = {
    height: 55,
    selected: 0,
    onSelect: () => {},
    searchBadge: 0,
    rapidsBadge: 0,
    centerBadge: 0,
  }

  state = {
    selected: '',
  }

  componentWillMount() {
    this.setState({ selected: this.props.initialSelected });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      searchBadge,
      rapidsBadge,
      centerBadge,
    } = this.props;
    const { selected } = this.state;

    if (selected !== nextState.selected) return true;

    if (searchBadge !== nextProps.searchBadge) return true;
    if (rapidsBadge !== nextProps.rapidsBadge) return true;
    if (centerBadge !== nextProps.centerBadge) return true;

    return false;
  }

  onSearchPress = () => this.props.onSelect('search');

  onRapidsPress = () => this.props.onSelect('rapids');

  onCenterPress = () => this.props.onSelect('center');

  handleWillFocus(route) {
    this.setState({ selected: route.id });
  }

  render() {
    const { height } = this.props;
    const { selected } = this.state;

    return (
      <View style={[sh.viewport, { height }]}>
        <TabBar
          barTintColor={color.backgroundAssist}
          tintColor={color.primary}
          unselectedTintColor={color.text}
        >
          <TabBar.Item
            key="search"
            title="單筆查詢"
            icon={{ uri: search, scale: 3 }}
            selected={selected === 'search'}
            onPress={this.onSearchPress}
          >
            <View />
          </TabBar.Item>
          <TabBar.Item
            key="rapids"
            title="快速建檔"
            icon={{ uri: rapids, scale: 3 }}
            selected={selected === 'rapids'}
            onPress={this.onRapidsPress}
          >
            <View />
          </TabBar.Item>
          <TabBar.Item
            key="center"
            title="應變中心"
            icon={{ uri: center, scale: 3 }}
            selected={selected === 'center'}
            onPress={this.onCenterPress}
          >
            <View />
          </TabBar.Item>
        </TabBar>
      </View>
    );
  }
}
