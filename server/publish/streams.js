Meteor.publish('allStreams', function() {
  return Streams.find();
});

Meteor.publish('twitchStreams', function() {
  return TwitchNames.find();
});
