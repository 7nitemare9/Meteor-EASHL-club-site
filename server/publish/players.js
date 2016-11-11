import { Players } from '../../lib/collections.js';

Meteor.publish('allPlayers', function() {
  return Players.find();
});
