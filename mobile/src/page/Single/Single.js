import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Title, Margin, NavigationView, IconButton } from 'component';
import color from 'color';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
});

export default class Single extends Component {

  static displayName = 'Single';

  static propTypes = {
    nav: PropTypes.objectOf(PropTypes.func),
    route: PropTypes.shape({
      victimId: PropTypes.string,
    }),
  }

  onAddPress = () => {
    Alert.alert('尚未開放');
  }

  render() {
    const { nav, route: { victimId } } = this.props;

    return (
      <NavigationView onLeftPress={nav.pop}>
        <Margin style={sh.viewport}>
          <View style={sh.header}>
            <Title>{victimId}</Title>
            <IconButton name="add" onPress={this.onAddPress} />
          </View>
        </Margin>
      </NavigationView>
    );
  }
}
