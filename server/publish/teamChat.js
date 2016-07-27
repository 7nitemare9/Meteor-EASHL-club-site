Meteor.publish('allChatMessages', function() {
  return ChatMessages.find();
});
