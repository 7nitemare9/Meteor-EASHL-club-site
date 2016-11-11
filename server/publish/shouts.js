import { Shouts } from '../../lib/collections.js';

Meteor.publish('allShouts', function() {
  return Shouts.find();
});
