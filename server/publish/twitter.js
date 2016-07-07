Meteor.publish('tweets', function() {
  return Tweets.find({}, {sort: {id: -1}, limit: 5});
});
