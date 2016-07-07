Meteor.methods({
  toggleRole(userId, role) {
    let roles = Meteor.users.findOne({_id: userId}).roles || [];
    if (~roles.indexOf(role)) {
      Roles.removeUsersFromRoles(userId, role);
    } else {
      Roles.addUsersToRoles(userId, role);
    }
  }
})
