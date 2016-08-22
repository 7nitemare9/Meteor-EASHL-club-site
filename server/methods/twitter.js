import StreamTweets from 'stream-tweets';
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
                     token: process.env.TW_TOKEN,
                     token_secret: process.env.TW_TOKEN_SECRET};
      const following = ['50004938', '33936681', '25660180'];
      const st = new StreamTweets(TWITTERKEYS, false);
      st.stream({follow: following}, Meteor.bindEnvironment(function(result) {
        if (following.indexOf(result.user.id.toString()) != -1 && !result.in_reply_to_user_id) {
            if (!Tweets.findOne({id: result.id})) {
              Tweets.insert(result);
            }
        }
      }, function(e) { throw e; }));
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
