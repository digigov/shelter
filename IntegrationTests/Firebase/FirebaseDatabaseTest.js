import React, { Component } from 'react';
import {
  NativeModules,
  Platform,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Database } from 'react-native-bridge-firebase';
import faker from 'faker';
import expect from 'native-matcher';

const { DATA_CHILD } = Database;
const { TestModule } = NativeModules;

const path = '/testing';

const styles = StyleSheet.create({
  reply: {
    paddingVertical: 3,
    paddingLeft: 10,
  },
  button: {
    textAlign: 'center',
    paddingVertical: 5,
  },
  buttonWrap: {
    borderWidth: 1,
    margin: 5,
  },
});

const defaultState = {
  child: null,
  testAddChild: 'wait',
  testSetBooleanValue: 'wait',
  testSetNumberValue: 'wait',
  testSetStringValue: 'wait',
  testSetObjectValue: 'wait',
  testRemoveValue: 'wait',
  testListener: 'wait',
};

export default class FirebaseDatabaseTest extends Component {

  static displayName = 'FirebaseDatabaseTest';

  state = defaultState;

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.autoRun();
    }
  }

  autoRun = async () => {
    this.setState(defaultState);

    await this.testAddChild();
    await this.testSetBooleanValue();
    await this.testSetNumberValue();
    await this.testSetStringValue();
    await this.testSetObjectValue();
    await this.testRemoveValue();
    await this.testListener();

    if (TestModule) {
      TestModule.markTestCompleted();
    }
  }

  testAddChild = async () => {
    this.setState({ testAddChild: 'wait' });
    try {
      const child = await new Database(path).addChild();
      this.setState({ child, testAddChild: 'ok' });
    } catch (e) {
      console.error(e);
      this.setState({ testAddChild: 'failed' });
    }
  }

  testSetBooleanValue = async () => {
    const { child } = this.state;
    const value = faker.random.boolean();

    this.setState({ testSetBooleanValue: 'wait' });
    try {
      await child.setValue(value);
      const reply = await child.getValue();
      expect(reply).toBe(value);
      this.setState({ testSetBooleanValue: 'ok' });
    } catch (e) {
      console.error(e);
      this.setState({ testSetBooleanValue: 'failed' });
    }
  }

  testSetNumberValue = async () => {
    const { child } = this.state;
    const value = faker.random.number();

    this.setState({ testSetNumberValue: 'wait' });
    try {
      await child.setValue(value);
      const reply = await child.getValue();
      expect(reply).toBe(value);
      this.setState({ testSetNumberValue: 'ok' });
    } catch (e) {
      console.error(e);
      this.setState({ testSetNumberValue: 'failed' });
    }
  }

  testSetStringValue = async () => {
    const { child } = this.state;
    const value = faker.random.word();

    this.setState({ testSetStringValue: 'wait' });
    try {
      await child.setValue(value);
      const reply = await child.getValue();
      expect(reply).toBe(value);
      this.setState({ testSetStringValue: 'ok' });
    } catch (e) {
      console.error(e);
      this.setState({ testSetStringValue: 'failed' });
    }
  }

  testSetObjectValue = async () => {
    const { child } = this.state;
    const value = faker.helpers.userCard();

    this.setState({ testSetObjectValue: 'wait' });
    try {
      await child.setValue(value);
      const reply = await child.getValue();
      expect(reply).toEqual(value);
      this.setState({ testSetObjectValue: 'ok' });
    } catch (e) {
      console.error(e);
      this.setState({ testSetObjectValue: 'failed' });
    }
  }

  testRemoveValue = async () => {
    const { child } = this.state;

    this.setState({ testRemoveValue: 'wait' });
    try {
      const collection = new Database(path);
      await collection.removeValue();
      const reply = await child.getValue();
      expect(reply).toBe(null);
      this.setState({ testRemoveValue: 'ok' });
    } catch (e) {
      console.error(e);
      this.setState({ testRemoveValue: 'failed' });
    }
  }

  testListener = async () => {
    this.setState({ testListener: 'wait' });
    try {
      const child = await new Database(path).addChild();
      const key = child.getKey();
      const value = faker.random.word();
      const otherValue = faker.random.word();

      let childAddedListener = false;
      let childChangedListener = false;
      let childRemovedListener = false;
      await new Promise((resolve, reject) => {
        let count = 0;
        new Database(path).addValueListener(async(data) => {
          count += 1;
          try {
            switch (count) {
              case 1:
                expect(data).toBe(null);
                break;
              case 2:
                expect(data[key]).toBe(value);
                child.setValue(otherValue);
                break;
              case 3:
                expect(data[key]).toBe(otherValue);
                child.removeValue();
                break;
              case 4:
                expect(data).toBe(null);
                expect(childAddedListener).toBe(true);
                expect(childChangedListener).toBe(true);
                expect(childRemovedListener).toBe(true);
                await new Database(path).removeValueListener();
                break;
              default:
                throw new Error('Error count on value listener');
            }
            resolve();
          } catch (e) {
            reject(e);
          }
        });

        new Database(path).addChildListener(DATA_CHILD.ADDED, async(data) => {
          try {
            expect(data.key).toBe(key);
            expect(data.value).toBe(value);
            await new Database(path).removeChildListener(DATA_CHILD.ADDED);
            childAddedListener = true;
          } catch (e) {
            reject(e);
          }
        });

        new Database(path).addChildListener(DATA_CHILD.CHANGED, async(data) => {
          try {
            expect(data.key).toBe(key);
            expect(data.value).toBe(otherValue);
            await new Database(path).removeChildListener(DATA_CHILD.CHANGED);
            childChangedListener = true;
          } catch (e) {
            reject(e);
          }
        });

        new Database(path).addChildListener(DATA_CHILD.REMOVED, async(data) => {
          try {
            expect(data.key).toBe(key);
            expect(data.value).toBe(otherValue);
            await new Database(path).removeChildListener(DATA_CHILD.REMOVED);
            childRemovedListener = true;
          } catch (e) {
            reject(e);
          }
        });

        new Database(path).removeValue();
        setTimeout(() => {
          child.setValue(value);
        }, 200);
      });

      this.setState({ testListener: 'ok' });
    } catch (e) {
      console.error(e);
      this.setState({ testListener: 'failed' });
    }
  }

  target = null;

  render() {
    const {
      testAddChild,
      testSetBooleanValue,
      testSetNumberValue,
      testSetStringValue,
      testSetObjectValue,
      testRemoveValue,
      testListener,
    } = this.state;

    return (
      <ScrollView>
        <View>
          <Text style={styles.reply}>testAddChild: {testAddChild}</Text>
          <Text style={styles.reply}>testSetBooleanValue: {testSetBooleanValue}</Text>
          <Text style={styles.reply}>testSetNumberValue: {testSetNumberValue}</Text>
          <Text style={styles.reply}>testSetStringValue: {testSetStringValue}</Text>
          <Text style={styles.reply}>testSetObjectValue: {testSetObjectValue}</Text>
          <Text style={styles.reply}>testRemoveValue: {testRemoveValue}</Text>
          <Text style={styles.reply}>testListener: {testListener}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.buttonWrap}
            onPress={this.autoRun}
          >
            <Text style={styles.button}>AutoRun</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrap}
            onPress={this.testAddChild}
          >
            <Text style={styles.button}>testAddChild</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrap}
            onPress={this.testSetBooleanValue}
          >
            <Text style={styles.button}>testSetBooleanValue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrap}
            onPress={this.testSetNumberValue}
          >
            <Text style={styles.button}>testSetNumberValue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrap}
            onPress={this.testSetStringValue}
          >
            <Text style={styles.button}>testSetStringValue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrap}
            onPress={this.testSetObjectValue}
          >
            <Text style={styles.button}>testSetObjectValue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrap}
            onPress={this.testRemoveValue}
          >
            <Text style={styles.button}>testRemoveValue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrap}
            onPress={this.testListener}
          >
            <Text style={styles.button}>testListener</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
