import Twitter from 'twit';
import Request from 'request';

Meteor.methods({
  //get from old site.
    getTweets() {
      Meteor.http.call('GET', "http://bombers-hockey.com/tweets.json").data.forEach((data) => {
        if (!Tweets.findOne({id: data.id})) {
          Tweets.insert(data);
        }
      })
    },

    getTweets2() {
      const TWITTERKEYS = {consumer_key: process.env.TW_CONSUMER_KEY,
                     consumer_secret: process.env.TW_CONSUMER_SECRET,
                     access_token: process.env.TW_TOKEN,
                     access_token_secret: process.env.TW_TOKEN_SECRET,
                     timeout_ms: 90000};
      const following = ['50004938', '33936681', '25660180'];
      const languages = ['en', 'sv'];
      const st = new Twitter(TWITTERKEYS);
      const tStream = st.stream('statuses/filter', {follow: following,   language: languages});
      tStream.on('tweet', Meteor.bindEnvironment(function(result) {
        if (~following.indexOf(result.user.id.toString()) && !result.in_reply_to_user_id && ~languages.indexOf(result.lang)) { //language check added as language filter seems not to work
            if (!Tweets.findOne({id: result.id})) {
              Tweets.insert(result);
            }
        }
      }));
    },

    postTweet(message) {
      const TWITTERKEYS = {consumer_key: process.env.TW_CONSUMER_KEY,
                     consumer_secret: process.env.TW_CONSUMER_SECRET,
                     token: process.env.TW_TOKEN,
                     token_secret: process.env.TW_TOKEN_SECRET};
      const params = {
        uri: `https://api.twitter.com/1.1/statuses/update.json`,
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
        oauth: TWITTERKEYS,
        body: `status=${encodeURIComponent(message)}`
      }
      const req = Request(params);
    },

    checkTweets(idx) {
      Tweets.find({}, {sort: {id: -1}}, {limit: 5}).forEach((data, index) => {
        if (idx == index) {
        console.log(data);
        }
      });
    }
})
