Meteor.publish('allShouts', function() {
  return Shouts.find();
});
