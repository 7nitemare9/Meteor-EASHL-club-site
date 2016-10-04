Meteor.methods({
  addForumCategory(name, description, available_to) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      ForumCategories.insert({
        name: name,
        description: description,
        available_to: available_to,
        numThreads: 0,
        latestActiveThread: null
      });
      return true;
    }
    return false;
  },
  addForumThread(category, title, message, user) {
    let availTo = ForumCategories.findOne({name: category}).available_to;
    let currentUser = Meteor.user();
    if (currentUser && (Roles.userIsInRole(currentUser, availTo) || availTo.length < 1)) {
      try {
        let id = ForumThreads.insert({
          category: category,
          title: title,
          message: message,
          userId: user,
          numPosts: 0,
          latestPost: null,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        ForumCategories.update({
            name: category
        }, {$inc: {
                numThreads: 1
            },$set: {
                LatestActiveThread: ForumThreads.findOne({
                    _id: id
                })
            }
        });
        return id;
      }
      catch(err) {
        throw new Meteor.error(`could not create thread: ${err}`);
      }
    }
  },
  addForumPost(thread, message, user) {
    let availTo = ForumCategories.findOne({name: ForumThreads.findOne({_id: thread}).category}).available_to;
    let currentUser = Meteor.user();
    if (currentUser && (Roles.userIsInRole(currentUser, availTo) || availTo.length < 1)) {
      let post = ForumPosts.insert({
        thread: thread,
        message: message,
        userId: user,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      ForumThreads.update({_id: thread},
        {$inc: {numPosts: 1},
         $set: {latestPost: ForumPosts.findOne({_id: post}), updatedAt: new Date()}});
      return true;
    }
    return false;
  },
  deleteForumPost(id) {
    if ((Meteor.user()._id == ForumPosts.findOne({_id: id}).userId) || Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        let forumThread = ForumPosts.findOne({_id: id}).thread;
        ForumPosts.remove({_id: id});
        ForumThreads.update({_id: forumThread}, {$inc: {numPosts: -1}});
        return forumThread;
      }
      catch(err) {
        throw new Meteor.Error(err.error);
      }
    }
  },
  deleteForumThread(id) {
    if ((Meteor.user()._id == ForumThreads.findOne({_id: id}).userId) || Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        if (ForumThreads.findOne({_id: id}).numPosts > 0) {
          throw new Meteor.Error("thread has replies, can't delete");
        }
        let forumCategory = ForumThreads.findOne({_id: id}).category;
        ForumThreads.remove({_id: id});
        ForumCategories.update({name: forumCategory}, {$inc: {numThreads: -1}});
        return forumCategory;
      }
      catch(err) {
        throw new Meteor.Error(`could not delete thread: ${err.error}`);
      }
    }
  },
  updateForumPost(id, message) {
    if ((Meteor.user()._id == ForumPosts.findOne({_id: id}).userId) || Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        ForumPosts.update({_id: id}, {$set: {message: message, updatedAt: new Date()}});
        return ForumPosts.findOne({_id: id}).thread;
      }
      catch(err) {
        throw new Meteor.Error(err[0]);
      }
    }
  },
  updateForumThread(id, message, title) {
    if ((Meteor.user()._id == ForumThreads.findOne({_id: id}).userId) || Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        ForumThreads.update({_id: id}, {$set: {message: message, title: title, updatedAt: new Date()}});
      }
      catch(err) {
        throw new Meteor.Error(err[0]);
      }
    }
  }
});
