Meteor.publish('allNews', function() {
  return NewsPosts.find();
});

Meteor.publish('newsItem', function(id) {
  return NewsPosts.find({_id: id});
});
