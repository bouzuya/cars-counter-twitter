import Twitter from 'twitter';

interface Counts { [k: string]: number; }

export default function main(): Promise<Counts> {
  const accessTokenKey = process.env.TWITTER_ACCESS_TOKEN;
  const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
  const consumerKey = process.env.TWITTER_CONSUMER_KEY;
  const consumerSecret = process.env.TWITTER_CONSUMER_SECRET;
  const screenName = process.env.TWITTER_USERNAME; // TODO
  if (typeof accessTokenKey === 'undefined')
    throw new Error('TWITTER_ACCESS_TOKEN is not defined');
  if (typeof accessTokenSecret === 'undefined')
    throw new Error('TWITTER_ACCESS_TOKEN_SECRET is not defined');
  if (typeof consumerKey === 'undefined')
    throw new Error('TWITTER_CONSUMER_KEY is not defined');
  if (typeof consumerSecret === 'undefined')
    throw new Error('TWITTER_CONSUMER_SECRET is not defined');
  if (typeof screenName === 'undefined')
    throw new Error('TWITTER_USERNAME is not defined');
  return new Twitter({
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret,
    consumer_key: consumerKey,
    consumer_secret: consumerSecret
  })
    .get('users/show', { screen_name: screenName })
    .then(({
      favourites_count,
      followers_count,
      friends_count,
      statuses_count
    }) => {
      return {
        'Twitter Favorites': favourites_count,
        'Twitter Followers': followers_count,
        'Twitter Following': friends_count,
        'Twitter Tweets': statuses_count
      };
    });
}
