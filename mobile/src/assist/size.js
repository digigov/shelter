/**
 * @providesModule size
 */

import { Platform } from 'react-native';

export default {
  margin: 30,
  input: 40,
  maxWidth: 340,
  font: {
    title: 36,
    label: 20,
    text: 18,
    note: 14,
    bold: '600',
    light: '200',
  },
  ...Platform.select({
    ios: {
      navbar: 44,
      statusBar: 20,
    },
    android: {
      navbar: 56,
      statusBar: 0,
    },
  }),
};
