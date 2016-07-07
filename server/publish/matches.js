Meteor.publish('lastMatches', function() {
  return Matches.find({}, {sort: {timestamp: -1}, limit: 5});
});

Meteor.publish('oneMatch', function(id) {
  console.log(Matches.find({_id: id}).fetch());
  return Matches.find({_id: id});
});

Meteor.publish('tenMatches', function(skip) {
  console.log('publish called');
  return Matches.find({}, {sort: {timestamp: -1}, skip: skip, limit: 15});
});
