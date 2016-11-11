import { Streams, TwitchNames } from '../../lib/collections.js';

Meteor.publish('allStreams', function() {
  return Streams.find();
});

Meteor.publish('twitchStreams', function() {
  return TwitchNames.find();
});
