import React, { Component, PropTypes } from 'react';
import { Navigator, StyleSheet, View, ScrollView, TextInput } from 'react-native';
import { Margin, Item, IconButton, TextButton, NextButton, Label } from 'component';
import color from 'color';
import size from 'size';
import category from '../../assist/category';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: size.font.text,
    marginTop: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: size.statusBar + 15,
    paddingBottom: 10,
    paddingLeft: size.margin,
    paddingRight: size.margin,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default class EventPanel extends Component {

  static displayName = 'EventPanel';

  static propTypes = {
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
  }

  static defaultProps = {
    onCancel: () => {},
    onSave: () => {},
  }

  state = {
    input: '',
  }

  onCancelPress = () => this.props.onCancel();

  onSavePress = (type) => {
    const { input } = this.state;
    this.props.onSave(type, input);
  }

  onChange = (input) => this.setState({ input });

  renderScene = (route, navigator) => {
    const { input } = this.state;

    return route ? (
      <View style={sh.viewport}>
        <View style={sh.navbar}>
          <Label>{`${route}細節補充`}</Label>
        </View>
        <Margin style={sh.viewport}>
          <TextInput
            multiline
            autoFocus
            style={sh.input}
            value={input}
            onChangeText={this.onChange}
          />
        </Margin>
        <Margin style={sh.button}>
          <TextButton onPress={navigator.pop}>上一步</TextButton>
          <NextButton onPress={() => this.onSavePress(route)}>儲存</NextButton>
        </Margin>
      </View>
    ) : (
      <View style={sh.viewport}>
        <View style={sh.navbar}>
          <Label>事件類別</Label>
          <TextButton onPress={this.onCancelPress}>取消</TextButton>
        </View>
        <ScrollView>
          <Margin style={sh.viewport}>
            {category.map((item, idx) => (
              <Item key={idx} isFirst={!idx} label={item} onPress={() => navigator.push(item)}>
                <IconButton name="chevron-right" />
              </Item>
            ))}
          </Margin>
        </ScrollView>
      </View>
    )
  };

  render() {
    return (
      <Navigator
        ref={navigator => { this.navigator = navigator; }}
        renderScene={this.renderScene}
        configureScene={() => ({ ...Navigator.SceneConfigs.HorizontalSwipeJump })}
      />
    );
  }
}
