Meteor.publish('allStreams', function() {
  return Streams.find();
});
