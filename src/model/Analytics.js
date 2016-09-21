import { Analytics, Crash } from 'react-native-bridge-firebase';
import moment from 'moment-timezone';
import isError from 'lodash/isError';
import isUndefined from 'lodash/isUndefined';
import toNumber from 'lodash/toNumber';
import toInteger from 'lodash/toInteger';
import toString from 'lodash/toString';


const { LOG } = Analytics;

const tz = 'Asia/taipei';

class AnalyticsModel {

  name = 'Analytics';

  constructor() {
    if (__DEV__) this.disable();
  }

  disabled = false;

  disable() {
    this.disabled = true;
    Analytics.setEnabled(false);
  }

  setUserId(userId) {
    Analytics.setUserId(userId);
  }

  setUserProperty(name, value) {
    Analytics.setUserProperty(name, value);
  }

  logScreen(name) {
    if (this.disabled || isUndefined(name)) return;
    Analytics.logEvent(LOG.VIEW_SCREEN, { item_id: toString(name) });
  }

  logAppOpen() {
    if (this.disabled) return;
    Analytics.logEvent(LOG.APP_OPEN);
  }

  logSelect(type, id) {
    if (this.disabled || isUndefined(type) || isUndefined(id)) return;
    Analytics.logEvent(LOG.SELECT_CONTENT, {
      content_type: toString(type),
      item_id: toString(id),
    });
  }

  logSearch(keyword, { type, area, start, end } = {}) {
    if (this.disabled || isUndefined(keyword)) return;
    Analytics.logEvent(LOG.SEARCH, {
      search_term: toString(keyword),
      travel_class: toString(type || 'all'),
      destination: toString(area || 'all'),
      start_date: start ? moment(start).tz(tz).format() : 'any',
      end_date: end ? moment(end).tz(tz).format() : 'any',
    });
  }

  logWishlist(category, id, { name, location } = {}) {
    if (this.disabled || isUndefined(category) || isUndefined(id)) return;
    Analytics.logEvent(LOG.ADD_TO_WISHLIST, {
      item_category: toString(category),
      item_id: toString(id),
      item_name: toString(name || id),
      quantity: 1,
      item_location_id: location ? JSON.stringify(location) : undefined,
    });
  }

  logCheckout(id, value, {
    start,
    end,
    type,
    currency,
    passenger,
    buyerArea,
    serviceArea,
  } = {}) {
    if (this.disabled || isUndefined(id) || isUndefined(value)) return;
    Analytics.logEvent(LOG.BEGIN_CHECKOUT, {
      transaction_id: toString(id),
      value: toNumber(value),
      start_date: start ? moment(start).tz(tz).format() : undefined,
      end_date: end ? moment(end).tz(tz).format() : undefined,
      currency: toString(currency || 'TWD'),
      number_of_passengers: toNumber(passenger) || 1,
      origin: buyerArea ? toString(buyerArea) : undefined,
      destination: serviceArea ? toString(serviceArea) : undefined,
      travel_class: type ? toString(type) : undefined,
    });
  }

  logPurchase(id, value, {
    currency,
    fee,
    cost,
    coupon,
    start,
    end,
    location,
    passenger,
    buyerArea,
    serviceArea,
    type,
  } = {}) {
    if (this.disabled || isUndefined(id) || isUndefined(value)) return;
    Analytics.logEvent(LOG.ECOMMERCE_PURCHASE, {
      transaction_id: toString(id),
      value: toNumber(value),
      currency: toString(currency || 'TWD'),
      tax: toNumber(fee) || 0,
      shipping: toNumber(cost) || 0,
      coupon: coupon ? toString(coupon) : undefined,
      start_date: start ? moment(start).tz(tz).format() : undefined,
      end_date: end ? moment(end).tz(tz).format() : undefined,
      location: location ? JSON.stringify(location) : undefined,
      number_of_passengers: toInteger(passenger) || 1,
      origin: buyerArea ? toString(buyerArea) : undefined,
      destination: serviceArea ? toString(serviceArea) : undefined,
      travel_class: type ? toString(type) : undefined,
    });
  }

  logRefund(id, value, currency = 'TWD') {
    if (this.disabled || isUndefined(id) || isUndefined(value)) return;
    Analytics.logEvent(LOG.PURCHASE_REFUND, {
      transaction_id: toString(id),
      value: toNumber(value),
      currency: toString(currency),
    });
  }

  logException(error) {
    if (this.disabled || isUndefined(error)) return;
    Crash.report(isError(error) ? error.message : toString(error));
  }
}

export default new AnalyticsModel();
