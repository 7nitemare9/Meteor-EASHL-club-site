import { ChatMessages } from '../../lib/collections.js';

Meteor.methods({
  addChatMessage(user, message) {
    ChatMessages.insert({
      user: user._id,
      date: new Date(),
      message: message
    });
    Meteor.users.find({roles: {$in: ['Team-member']}}).fetch().map(user => {
      console.log(user);
      if (user.profile.missedMessages) {
        Meteor.users.update({_id: user._id}, {$inc: {'profile.missedMessages': 1}});
      } else {
        Meteor.users.update({_id: user._id}, {$set: {'profile.missedMessages': 1}});
      }
    });
  },
  deleteChatMessage(id) {
    ChatMessages.remove({_id: id});
  },
  updateChatMessage(id, message) {
    ChatMessages.update({_id: id}, {$set: {message: message}});
  },
  nullMissedMessages(user) {
    console.log(user.profile.gamertag);
    Meteor.users.update({_id: user._id}, {$set: {'profile.missedMessages': 0}});
  }
});
