Meteor.publish('allUsers', function() {
  return Meteor.users.find();
});

Meteor.publish('allUserProfiles', function() {
  if (Meteor.isServer) {
    return Meteor.users.find(); // So that SSR get full user on Meteor.user() as client does.
  } else {
    return Meteor.users.find({}, {fields: {profile: 1}});
  }
});

Meteor.publish('deletedUsers', function() {
  return DeletedUsers.find();
})
