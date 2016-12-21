import React, { Component, PropTypes } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { Title, Margin, NavigationView, IconButton } from 'component';
import color from 'color';
import EventPanel from '../EventPanel/EventPanel';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
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

  state = {
    addVisible: false,
  }

  onAddPress = () => this.setState({ addVisible: true });

  onCancelPress = () => this.setState({ addVisible: false });

  onSavePress = () => this.setState({ addVisible: false });

  render() {
    const { nav, route: { victimId } } = this.props;
    const { addVisible } = this.state;

    return (
      <NavigationView onLeftPress={nav.pop}>
        <Margin style={sh.viewport}>
          <View style={sh.header}>
            <Title>{victimId}</Title>
            <IconButton name="add" onPress={this.onAddPress} />
          </View>
          <Modal visible={addVisible} animationType="fade">
            <EventPanel
              onCancel={this.onCancelPress}
              onSave={this.onSavePress}
            />
          </Modal>
        </Margin>
      </NavigationView>
    );
  }
}
