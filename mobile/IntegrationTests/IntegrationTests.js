import { AppRegistry } from 'react-native';
import FirebaseDatabaseTest from './Firebase/FirebaseDatabaseTest';

const TESTS = [
  FirebaseDatabaseTest,
];

TESTS.forEach(
  (test) => AppRegistry.registerComponent(test.displayName, () => test)
);
