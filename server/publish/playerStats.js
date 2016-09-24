Meteor.publish('playerStats', function() {
  return PlayerStats.find({}, {sort: {created_at: -1}, limit: 1});
})
