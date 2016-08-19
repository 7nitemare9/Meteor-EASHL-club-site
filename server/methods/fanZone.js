Meteor.methods({

  insertImage(link) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        Media.insert({link: link, type: 'image'});
      }
      catch(err) {
        throw new Meteor.Error(`Could not add image: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or lack permission to add images`);
    }
  },

  insertVideo(link) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        Media.insert({link: link, type: 'video'});
      }
      catch (err) {
        throw new Meteor.Error(`Could not add video: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or lack permission to add videos`);
    }
  },

  deleteMedia(id) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      try {
        Media.remove({_id: id});
      }
      catch(err) {
        throw new Meteor.Error(`Could not delete media: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or lack permission to delete media`);
    }
  }
});
