Meteor.publish('allResolutions', function() {
    return Resolutions.find();
});

Meteor.publish('allNews', function() {
    return NewsPosts.find();
});

Meteor.publish('lastMatches', function() {
  return Matches.find({}, {sort: {timestamp: -1}, limit: 5});
});

Meteor.publish('oneMatch', function(id) {
  console.log(Matches.find({_id: id}).fetch());
  return Matches.find({_id: id});
});

Meteor.publish('tenMatches', function(skip) {
  console.log('publish called');
  return Matches.find({}, {sort: {timestamp: -1}, skip: skip, limit: 15});
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
