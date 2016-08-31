Meteor.methods({
  moveToDeleted(user) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        DeletedUsers.insert(user);
        Meteor.users.remove({_id: user._id});
      }
      catch (err) {
        throw new Meteor.Error(`Could not delete user: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or lack permission to delete users`);
    }
    return `User deleted`;
  },

  returnDeletedUser(id) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        let user = DeletedUsers.findOne({_id: id});
        delete user._id;
        Meteor.users.upsert({_id: id}, user);
        DeletedUsers.remove({_id: id});
      }
      catch (err) {
        throw new Meteor.Error(`Could not re-insert user: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or lack permission to re-insert users`);
    }
    return `User re-inserted`;
  }
});
