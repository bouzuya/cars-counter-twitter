var Counter = require('./counter');

module.exports = function(callback) {
  new Counter().count(process.env.TWITTER_USERNAME, callback);
};

