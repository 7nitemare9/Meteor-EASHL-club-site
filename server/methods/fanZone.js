Meteor.methods({

  insertImage(link) {
    Media.insert({link: link, type: 'image'});
  },

  insertVideo(link) {
    Media.insert({link: link, type: 'video'});
  }
});
