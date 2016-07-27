Meteor.methods({
    getNewsData() {
        Meteor.http.call('GET', "http://54.170.53.83/posts.json").data.forEach(function(data){
            console.log(data.title);
            NewsPosts.insert({
                title: data.title,
                image: data.image,
                youtube: data.youtube,
                text: data.text,
                id: data.id
            });
        });
    },
    addNews(data) {
      if (Roles.userIsInRole(Meteor.user(), ['Admin', 'News-poster'])) {
        try {
          data.created_at = new Date();
          NewsPosts.insert(data);
          return true;
        }
        catch(err) {
          throw new Meteor.Error(`could not add news ${err}`);
        }
      }
    },
    updateNews(id, data) {
      if (Roles.userIsInRole(Meteor.user(), ['Admin', 'News-poster'])) {
        try {
          NewsPosts.update({
              _id: id
          }, {
              $set: {
                  title: data.title,
                  image: data.image,
                  youtube: data.youtube,
                  text: data.text
              }
          });
          return true;
        }
        catch(err) {
          throw new Meteor.Error(`update failed ${err}`);
        }
      }
    },
    deleteNews(id) {
      if (Roles.userIsInRole(Meteor.user(), ['Admin', 'News-poster'])) {
        try {
          NewsPosts.remove({_id: id});
          return true;
        }
        catch(err) {
          throw new Meteor.error(`delete failed ${err}`);
        }
      }
    },
    addCreatedAt() {
      NewsPosts.find().fetch().map(data => {
        if (data.id) {
          date = new Date(2016, 0, 01);
          date.setDate(date.getDate() + data.id);
          NewsPosts.update({_id: data._id}, {$set: {created_at: date}});
        }
      });
    }
  });
