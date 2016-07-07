Meteor.methods({
    getNewsData() {
        Meteor.http.call('GET', "http://bombers-hockey.com/posts.json").data.forEach(function(data){
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
        NewsPosts.insert(data);
      }
    },
    updateNews(id, data) {
      if (Roles.userIsInRole(Meteor.user(), ['Admin', 'News-poster'])) {
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
      }
    },
    deleteNews(id) {
      if (Roles.userIsInRole(Meteor.user(), ['Admin', 'News-poster'])) {
        NewsPosts.remove({_id: id});
      }
    }
  });
