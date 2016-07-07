Meteor.publish('allOfFanZone', function() {
  return Media.find();
});
