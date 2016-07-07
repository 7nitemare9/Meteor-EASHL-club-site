Meteor.methods({
  addForumCategory(name, description) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      ForumCategories.insert({
        name: name,
        description: description,
        numThreads: 0,
        latestActiveThread: null
      });
    }
  },
  addForumThread(category, title, message, user) {
    let availTo = ForumCategories.findOne({name: category}).available_to;
    let currentUser = Meteor.user();
    if (currentUser && (Roles.userIsInRole(currentUser, availTo) || availTo.length < 1)) {
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
         $set: {latestPost: ForumPosts.findOne({_id: post})}});
      return true;
    }
    return false;
  },
  deleteForumPost(id) {
    if ((Meteor.user()._id == ForumPosts.findOne({_id: id}).userId) || Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      ForumPosts.remove({_id: id});
      ForumThreads.update({_id: ForumPosts.findOne({_id: id}).thread}, {$dec: {numPosts: 1}});
    }
  },
  updateForumPost(id, message) {
    if ((Meteor.user()._id == ForumPosts.findOne({_id: id}).userId) || Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      ForumPosts.update({_id: id}, {$set: {message: message}});
    }
  }
});
