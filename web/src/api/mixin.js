import Account from './account.js';

function Mixin(api) {
  this.api = api;
  this.account = new Account(this);
}

Mixin.prototype = {
  environment: function () {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.MixinContext) {
      return 'iOS';
    }
    if (window.MixinContext && window.MixinContext.getContext) {
      return 'Android';
    }
    return undefined;
  },

  assets: function (callback) {
    this.api.requestMixin('GET', 'https://api.mixin.one/assets', undefined, function (resp) {
      return callback(resp);
    });
  },

  asset: function (callback, id) {
    this.api.requestMixin('GET', 'https://api.mixin.one/assets/' + id, undefined, function (resp) {
      return callback(resp);
    });
  },

  snapshot: function (callback, snapshotId) {
    this.api.requestMixin('GET', 'https://api.mixin.one/snapshots/' + snapshotId, undefined, function (resp) {
      return callback(resp);
    });
  },

  verifyTrade: function(callback, trace) {
    this.api.requestMixin('GET', 'https://api.mixin.one/transfers/trace/'+trace, undefined, function(resp) {
      return callback(resp);
    });
  }
};

export default Mixin;