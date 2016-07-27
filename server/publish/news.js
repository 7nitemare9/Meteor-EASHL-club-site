Meteor.publish('allNews', function() {
  return NewsPosts.find();
});

Meteor.publish('frontPageNews', function() {
  return NewsPosts.find({}, {sort: {created_at: -1}, limit: 11});
})

Meteor.publish('newsItem', function(id) {
  return NewsPosts.find({_id: id});
});

Meteor.publish('tenNews', function(skip) {
  return NewsPosts.find({}, {sort: {created_at: -1}, skip, limit: 9});
});

Meteor.publish('current', function(id) {
  return NewsPosts.find({_id: id});
});

Meteor.publish('previous', function(id) {
  var current = NewsPosts.findOne({_id: id});
  return NewsPosts.find({created_at: {$lt: current.created_at}}, {sort: {created_at: -1}, limit: 1});
});

Meteor.publish('next', function(id) {
  var current = NewsPosts.findOne({_id: id});
  return NewsPosts.find({created_at: {$gt: current.created_at}}, {sort: {created_at: 1}, limit: 1});
});
