/**
 * @providesModule react-native-bridge-firebase/Database
 */
import _ from 'lodash';
import RNBridgeFirebase from './RNBridgeFirebase';
import Events from 'EventEmitter';

const { EventEmitter, EVENT, ERROR, DATA_CHILD } = RNBridgeFirebase;
export const childHandler = new Events();
export const valueHandler = new Events();

export default class Database {

  static EVENT = EVENT;

  static ERROR = ERROR;

  /**
   * CHILD_ADDED
   * CHILD_REMOVED
   * CHILD_CHANGED
   * CHILD_MOVED
   */
  static DATA_CHILD = DATA_CHILD;

  path = '';

  constructor(path: String) {
    this.path = /^\/.+/gi.test(path) ? path : `/${path}`;
  }

  child(path: String) {
    return new Database(`${this.path}/${path}`);
  }

  getKey() {
    const regex = /\/?([^/]+)$/.exec(this.path);
    return regex ? regex[1] : '';
  }

  async addChild() {
    const key = await RNBridgeFirebase.addDataChild(this.path);
    return this.child(key);
  }

  async setValue(value) {
    await RNBridgeFirebase.setDataValue(this.path, { value });
  }

  /**
   *  reply = {
   *    key: String,
   *    hasChildren: Boolean,
   *    exists: Boolean,
   *    childrenCount: Integer,
   *    priority: String,
   *  }
   */
  async getValue(path: String) {
    const reply = await RNBridgeFirebase.getDataValue(
      path ? `${this.path}/${path}` : this.path
    );

    return reply.value;
  }

  async removeValue() {
    return await RNBridgeFirebase.removeDataValue(this.path);
  }

  hasChildListener(path: String) {
    let total = 0;
    _.forEach(DATA_CHILD, type => {
      const eventName = `${path}::${type}`;
      total += childHandler.listeners(eventName).length;
    });

    return !!total;
  }

  async addValueListener(handler: Function) {
    const eventName = `${this.path}`;

    if (valueHandler.listeners(eventName).length < 1) {
      await RNBridgeFirebase.addDataValueListener(this.path);
    }

    return valueHandler.addListener(eventName, handler);
  }

  async removeValueListener(handler: Function) {
    const eventName = this.path;

    if (handler === undefined) {
      valueHandler.removeAllListeners(eventName);
    } else {
      valueHandler.removeListener(eventName, handler);
    }

    if (valueHandler.listeners(eventName).length < 1) {
      await RNBridgeFirebase.removeDataValueListener(this.path);
    }

    return true;
  }

  async addChildListener(type: Number, handler: Function) {
    const eventName = `${this.path}::${type}`;

    if (!this.hasChildListener(this.path)) {
      await RNBridgeFirebase.addDataChildListener(this.path);
    }

    return childHandler.addListener(eventName, handler);
  }

  async removeChildListener(type: Number, handler: Function) {
    const eventName = `${this.path}::${type}`;

    if (handler === undefined) {
      childHandler.removeAllListeners(eventName);
    } else {
      childHandler.removeListener(eventName, handler);
    }

    if (!this.hasChildListener(this.path)) {
      await RNBridgeFirebase.removeDataChildListener(this.path);
    }

    return true;
  }
}

if (EventEmitter) {
  EventEmitter.addListener(EVENT.DATA_CHILD_CHANGED, (data) => {
    const { key, value, path, type } = data;
    const eventName = `${path}::${type}`;
    childHandler.emit(eventName, { key, value });
  });
  EventEmitter.addListener(EVENT.DATA_VALUE_CHANGED, (data) => {
    const eventName = data.path;
    valueHandler.emit(eventName, data.value);
  });
}
