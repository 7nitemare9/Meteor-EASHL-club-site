Meteor.publish('events', function() {
  return Schedule.find();
});

Meteor.publish('oneEvent', function(id) {
  return Schedule.find({_id: id});
});
