Meteor.methods({
  addShout(message, name) {
    Shouts.insert({
      message: message,
      name: name,
      created_at: new Date()
    })
  },
  removeShout(shout) {
    Shouts.remove(shout);
  }
});
