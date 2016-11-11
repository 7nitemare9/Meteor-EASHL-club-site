import { ClubInfos } from '../../lib/collections.js';

Meteor.publish('clubInfo', function() {
  return ClubInfos.find();
});
