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
  return Tweets.find({}, {sort: {id: -1}, limit: 5});
});

Meteor.publish('allStreams', function() {
  return Streams.find();
});

Meteor.publish('allShouts', function() {
  return Shouts.find();
});

Meteor.publish('allPlayers', function() {
  return Players.find();
});

Meteor.publish('allOfFanZone', function() {
  return Media.find();
});
