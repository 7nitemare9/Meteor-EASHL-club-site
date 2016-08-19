Meteor.publish('clubInfo', function() {
  return ClubInfos.find();
});
