Meteor.publish('allForumCategories', function() {
  return ForumCategories.find();
});

Meteor.publish('allThreadsInCategory', function(category) {
  return ForumThreads.find({category: category});
});

Meteor.publish('oneThread', function(id) {
  return ForumThreads.find({_id: id});
});

Meteor.publish('allPostsInThread', function(thread) {
  return ForumPosts.find({thread: thread});
});

Meteor.publish('onePost', function(id) {
  return ForumPosts.find({_id: id});
});
