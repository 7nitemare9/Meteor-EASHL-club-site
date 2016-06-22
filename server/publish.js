Meteor.publish('allResolutions', function() {
    return Resolutions.find();
});

Meteor.publish('allNews', function() {
    return NewsPosts.find();
});

Meteor.publish('lastMatches', function() {
  return LastMatches.find();
});

Meteor.publish('userResolutions', function() {
    return Resolutions.find({user: this.userId});
});

Meteor.publish('tweets', function() {
  return Tweets.find({}, {sort: {created_at: -1}, limit: 5});
});

Meteor.publish('allStreams', function() {
  return Streams.find();
});
