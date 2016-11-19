/**
 * @providesModule react-native-bridge-firebase/Storage
 */
import RNBridgeFirebase from './RNBridgeFirebase';

export default class Storage {

  static EVENT = RNBridgeFirebase.EVENT;

  static ERROR = RNBridgeFirebase.ERROR;

  static async uploadJPG(path: String, base64: String) {
    return await RNBridgeFirebase.uploadJPG({ path, base64 });
  }
}
