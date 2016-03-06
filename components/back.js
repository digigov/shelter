'use strict';

import React from 'react-native';

const {
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
} = React;


const styles = StyleSheet.create({
  backButton: {
    width: 10,
    height: 17,
    marginLeft: 10,
    marginTop: 3,
    marginRight: 10
  }
});

export default class extends React.Component {
  render() {
    return (
      <Image source={require('image!back_button')} style={styles.backButton} />
    )
  }
}