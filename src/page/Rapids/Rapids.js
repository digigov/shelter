import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Margin, Title, IconButton, Item } from 'component';
import size from 'size';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
    paddingTop: size.statusBar + size.navbar,
  },
});

export default class Rapids extends Component {

  static displayName = 'Rapids';

  onItemPress = () => {

  }

  render() {
    return (
      <View style={sh.viewport}>
        <Margin>
          <Title>類別</Title>
          <ScrollView>
            <Item label="個資" onPress={() => this.onItemPress('個資')} isFirst>
              <IconButton name="add" />
            </Item>
            <Item label="物資" onPress={() => this.onItemPress('物資')}>
              <IconButton name="add" />
            </Item>
            <Item label="餐飲" onPress={() => this.onItemPress('餐飲')}>
              <IconButton name="add" />
            </Item>
            <Item label="充電" onPress={() => this.onItemPress('充電')}>
              <IconButton name="add" />
            </Item>
            <Item label="回報" onPress={() => this.onItemPress('回報')}>
              <IconButton name="add" />
            </Item>
            <Item label="協尋" onPress={() => this.onItemPress('協尋')}>
              <IconButton name="add" />
            </Item>
            <Item label="求助" onPress={() => this.onItemPress('求助')}>
              <IconButton name="add" />
            </Item>
            <Item label="諮詢" onPress={() => this.onItemPress('諮詢')}>
              <IconButton name="add" />
            </Item>
            <Item label="醫療" onPress={() => this.onItemPress('醫療')}>
              <IconButton name="add" />
            </Item>
            <Item label="其他" onPress={() => this.onItemPress('其他')}>
              <IconButton name="add" />
            </Item>
          </ScrollView>
        </Margin>
      </View>
    );
  }
}
