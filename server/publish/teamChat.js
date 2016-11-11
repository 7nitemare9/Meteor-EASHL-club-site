import { ChatMessages } from '../../lib/collections.js';

Meteor.publish('allChatMessages', function() {
  return ChatMessages.find();
});
