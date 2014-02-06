var Counter = require('./counter').Counter;

module.exports = function(callback) {
  new Counter().count(process.env.TWITTER_USERNAME, callback);
};

