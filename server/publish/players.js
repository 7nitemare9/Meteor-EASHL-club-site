Meteor.publish('allPlayers', function() {
  return Players.find();
});
