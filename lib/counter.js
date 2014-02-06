var Twitter = require('twitter');

var Counter = function() {
  var consumerKey = process.env.TWITTER_CONSUMER_KEY;
  var consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
  var accessTokenKey = process.env.TWITTER_ACCESS_TOKEN;
  var accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
  this.twitter = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
  });
};

Counter.prototype.fetch = function(username, callback) {
  this.twitter.showUser(username, callback);
};

Counter.prototype.parse = function(dataOrError) {
  if (dataOrError instanceof Error) throw dataOrError;
  return {
    'Twitter Tweets': dataOrError.statuses_count,
    'Twitter Following': dataOrError.friends_count,
    'Twitter Followers': dataOrError.followers_count,
    'Twitter Favorites': dataOrError.favourites_count
  };
};

Counter.prototype.count = function(username, callback) {
  var self = this;
  self.fetch(username, function(dataOrError) {
    try {
      var parsed = self.parse(dataOrError);
      callback(null, parsed);
    } catch(e) {
      callback(e);
    }
  });
};

module.exports.Counter = Counter;

