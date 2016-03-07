'use strict';

import React from 'react-native';

const {
  Picker,
} = React;

module.exports = function({ value, onChange }) {
  return (
    <Picker
      style={{ margin: 0 }}
      selectedValue={value}
      onValueChange={onChange}
    >
      <Picker.Item label="物資" value="物資" />
      <Picker.Item label="餐飲" value="餐飲" />
      <Picker.Item label="充電" value="充電" />
      <Picker.Item label="回報" value="回報" />
      <Picker.Item label="協尋" value="協尋" />
      <Picker.Item label="求助" value="求助" />
      <Picker.Item label="諮詢" value="諮詢" />
      <Picker.Item label="醫療" value="醫療" />
      <Picker.Item label="其他" value="其他" />
    </Picker>
  );
};