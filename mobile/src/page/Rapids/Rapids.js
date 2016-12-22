import React, { Component, PropTypes } from 'react';
import { StyleSheet, Modal, ScrollView, View, AsyncStorage } from 'react-native';
import { Margin, IconButton, Item } from 'component';
import isArray from 'lodash/isArray';
import range from 'lodash/range';
import size from 'size';
import EventPanel from '../EventPanel/EventPanel';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    paddingTop: size.statusBar + (size.navbar / 2),
  },
});

export default class Rapids extends Component {

  static displayName = 'Rapids';

  static propTypes = {
    nav: PropTypes.objectOf(PropTypes.func),
  }

  state = {
    panelVisible: false,
    rapidsSet: [],
    rapidsIdx: 0,
  }

  async componentWillMount() {
    try {
      const rapidsSet = await AsyncStorage.getItem('RapidsSet');
      const data = JSON.parse(rapidsSet);
      if (isArray(data)) this.setState({ rapidsSet: data });
    } catch (error) {
      this.setState({ rapidsSet: [] });
    }
  }

  onItemPress = (idx) => {
    const { rapidsIdx } = this.state;
    this.setState({
      rapidsIdx: idx,
      panelVisible: true,
      type: rapidsIdx[idx] ? rapidsIdx[idx].type : null,
      note: rapidsIdx[idx] ? rapidsIdx[idx].note : null,
    });
  };

  onAddPress = (type) => this.props.nav.push('swirls', type);

  onCancelPress = () => this.setState({ panelVisible: false });

  onSavePress = (type, note) => {
    const { rapidsSet, rapidsIdx } = this.state;
    rapidsSet[rapidsIdx] = { type, note };
    this.setState({ rapidsSet, panelVisible: false });
    AsyncStorage.setItem('RapidsSet', JSON.stringify(rapidsSet));
  }

  render() {
    const { panelVisible, rapidsSet, type, note } = this.state;

    return (
      <View style={sh.viewport}>
        <ScrollView>
          <Margin>
            {range(7).map((idx) => {
              const isSet = !!rapidsSet[idx];
              return (
                <Item
                  key={idx}
                  label={isSet ? rapidsSet[idx].type : '添加'}
                  tip={isSet ? rapidsSet[idx].note : '_'}
                  onPress={() => this.onItemPress(idx)}
                  isFirst={idx === 0}
                >
                  <IconButton
                    name={rapidsSet[idx] ? 'chevron-right' : 'add'}
                    onPress={() => (
                      isSet ? this.onAddPress(rapidsSet[idx]) : this.onItemPress(idx)
                    )}
                  />
                </Item>
              );
            })}
          </Margin>
        </ScrollView>
        <Modal visible={panelVisible} animationType="slide">
          <EventPanel
            type={type}
            note={note}
            onCancel={this.onCancelPress}
            onSave={this.onSavePress}
          />
        </Modal>
      </View>
    );
  }
}
