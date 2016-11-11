import { SharedSettings } from '../../lib/collections.js';

Meteor.publish('sharedSettings', () => {
  return SharedSettings.find();
});
