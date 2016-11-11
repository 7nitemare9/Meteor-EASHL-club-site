import { ForumCategories, ForumThreads, ForumPosts } from '../../lib/collections.js';

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

Meteor.publish('latestThreads', function() {
  if(Roles.userIsInRole(this.userId, ['Admin'])) {
    return ForumThreads.find({}, {sort: {updatedAt: 1}, limit: 5});
  }
  if(Roles.userIsInRole(this.userId, ['Team-member'])) {
    let categories = ForumCategories.find({available_to: {$ne: 'Admin'}}, {fields: {name: 1}}).fetch();
    categories = categories.map(data => data.name);
    return ForumThreads.find({category: {$in: categories}}, {sort: {updatedAt: 1}, limit: 5});
  } else {
    let categories = ForumCategories.find({available_to: {$nin: ['Team-member', 'Admin']}}, {fields: {name: 1}}).fetch();
    categories = categories.map(data => data.name);
    return ForumThreads.find({category: {$in: categories}}, {sort: {updatedAt: 1}, limit: 5});
  }
});
