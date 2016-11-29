/* eslint no-param-reassign: ["error", { "props": false }] */

import _ from 'lodash';

export default function (bookshelf) {
  bookshelf.Model = bookshelf.Model.extend({
    parse: function parse(attr) {
      const data = _.mapKeys(attr, (value, key) => _.camelCase(key));
      _.forEach(_.concat(this.json, 'detail'), (name) => {
        if (_.isString(data[name])) data[name] = JSON.parse(data[name]);
      });
      return data;
    },
    format: function format(attr) {
      _.forEach(_.concat(this.json, 'detail'), (name) => {
        if (attr[name] && !_.isString(attr[name])) attr[name] = JSON.stringify(attr[name]);
      });
      return _.mapKeys(attr, (value, key) => _.snakeCase(key));
    },
    where: function where(condition, ...args) {
      return this.query(
        'where',
        _.isPlainObject(condition) ?
          _.mapKeys(condition, (value, key) => _.snakeCase(key))
        :
          _.snakeCase(condition),
        ...args
      );
    },
    toJSON: function toJSON() {
      const { attributes: { detail, ...otherAttributes } } = this;
      return { ...otherAttributes, ...detail };
    },
  });
}
