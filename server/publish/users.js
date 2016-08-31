Meteor.publish('allUsers', function() {
  return Meteor.users.find();
});

Meteor.publish('allUserProfiles', function() {
  console.log('allUserProfiles');
  return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.publish('deletedUsers', function() {
  return DeletedUsers.find();
})
