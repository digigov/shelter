'use strict';

import Store from 'react-native-store';
import { getUniqueID } from 'react-native-device-info';

const record = Store.model('record');
const victim = Store.model('victim');

module.exports = {
  _getUid: function() {
    return (Math.random() * 0x1000000000 % 36).toString(36) + (Math.random() * 0x1000000000 % 36).toString(36) + (new Date().getTime() - 1262304000000).toString(36);
  },
  find: function(where) {
    return record.find({where, order: {createdAt: 'DESC'}});
  },
  removeById: function(id) {
    return record.removeById(id);
  },
  insert: function({ taiwanId, victimId, type, note }) {
    return new Promise((resolve, reject) => {
      taiwanId || victimId ? resolve() : reject();
    })
    .then(() => {
      if (taiwanId) {
        return victim.get({where: { taiwanId }}).then(reply => {
          if (reply && reply[0]) victimId = reply[0].victimId;
          return;
        });
      } else if (victimId) {
        return victim.get({where: { victimId }}).then(reply => {
          if (reply && reply[0]) taiwanId = reply[0].taiwanId;
          return;
        });
      }
    })
    .then(() => {
      const obj = {
        uid: this._getUid(),
        deviceId: getUniqueID(),
        taiwanId: taiwanId || '',
        victimId: victimId || '',
        type: type,
        note: note,
        createdAt: new Date().getTime(),
      };

      return record.add(obj);
    });
  }
};