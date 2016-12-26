import React, { PropTypes } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

const sh = StyleSheet.create({
  viewport: {
    flex: 1,
  },
});

function Component({ children }) {
  return (
    <KeyboardAvoidingView behavior="padding" style={sh.viewport}>
      {children}
    </KeyboardAvoidingView>
  );
}

Component.displayName = 'Component';

Component.propTypes = {
  children: PropTypes.node,
};

export default Component;
