import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Label, Icon } from 'component';
import isString from 'lodash/isString';
import color from 'color';
import size from 'size';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: color.background,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  navbarTransparent: {
    backgroundColor: color.transparent,
    borderBottomWidth: 0,
  },
  container: {
    height: size.navbar,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    minWidth: size.button,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  navbarLeftText: {
    fontSize: size.font.note,
    fontWeight: size.font.light,
  },
  navbarRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    minWidth: size.button,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});

export default class NavigationView extends Component {

  static displayName = 'NavigationView';

  static propTypes = {
    children: React.PropTypes.element.isRequired,
    left: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    right: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    title: PropTypes.string,
    opacity: PropTypes.number,
    hideStatusBar: PropTypes.bool,
    transparent: PropTypes.bool,
    style: View.propTypes.style,
    onLeftPress: PropTypes.func,
    onRightPress: PropTypes.func,
  };

  static defaultProps = {
    opacity: 1,
    hideStatusBar: false,
    transparent: false,
  }

  componentWillMount() {
    const { opacity } = this.props;

    if (opacity < 1) {
      this.statusBar = 0;
      this.navbar = 0;
    }
    this.animated = new Animated.Value(opacity);
  }

  componentWillReceiveProps(nextProps) {
    const { opacity } = nextProps;

    if (opacity !== this.props.opacity) {
      this.animated.setValue(opacity);
    }
  }

  showLeft = false;

  statusBar = size.statusBar;

  navbar = size.navbar;

  animated = null;

  renderLeft() {
    const { left, onLeftPress } = this.props;

    if (!onLeftPress) return null;

    return (
      <TouchableOpacity
        onPress={onLeftPress}
        style={sh.navbarLeft}
      >
        <Icon name="chevron-left" size={size.font.label} />
        {isString(left) ? <Text style={sh.navbarLeftText}>{left}</Text> : left}
      </TouchableOpacity>
    );
  }

  renderRight() {
    const { right, onRightPress } = this.props;

    if (!right) return null;

    return (
      <TouchableOpacity
        onPress={onRightPress}
        style={sh.navbarRight}
      >
        {isString(right) ? <Label color={color.primary}>{right}</Label> : right}
      </TouchableOpacity>
    );
  }

  render() {
    const {
      children,
      title,
      opacity,
      hideStatusBar,
      transparent,
      style,
    } = this.props;

    const statusBar = hideStatusBar ? 0 : this.statusBar;
    const navbar = transparent ? 0 : this.navbar;

    return (
      <View style={[sh.viewport, { paddingTop: navbar + statusBar }]}>
        <StatusBar hidden={opacity === 0 || hideStatusBar} />
        {children}
        <Animated.View
          style={[
            sh.navbar, style,
            { opacity: this.animated },
            !hideStatusBar && { paddingTop: size.statusBar },
            transparent && sh.navbarTransparent,
          ]}
          pointerEvents={opacity > 0 ? 'auto' : 'none'}
        >
          <View style={sh.container}>
            {title && <Label>{title}</Label>}
            {this.renderLeft()}
            {this.renderRight()}
          </View>
        </Animated.View>
      </View>
    );
  }
}
