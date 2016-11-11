import { Media } from '../../lib/collections.js';

Meteor.publish('allOfFanZone', function() {
  return Media.find();
});
