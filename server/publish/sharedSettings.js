Meteor.publish('sharedSettings', () => {
  return SharedSettings.find();
});
