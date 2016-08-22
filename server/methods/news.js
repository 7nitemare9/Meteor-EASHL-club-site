function getImage(data) {
  if (data) {
    if (data.image.length > 0) {
      return data.image;
    } else if (data.youtube.length > 0) {
      if(typeof data.youtube === "string") {
        return youtubeToImage(data.youtube);
      }
      return youtubeToImage(data.youtube[0]);
    } else {
      return "test.jpg";
    }
  }
}

function youtubeToImage(image) {
  if(image.indexOf('embed/') !== -1) {
    return (image.replace(image.substring(0, image.indexOf('embed/') + 6), 'http://img.youtube.com/vi/').concat('/0.jpg'));
  } else if (image.indexOf('.be/') !== -1) {
    return (image.replace(image.substring(0, image.indexOf('.be/') + 4), 'http://img.youtube.com/vi/').concat('/0.jpg'));
  } else if (image.indexOf('watch?v=') !== -1) {
    if (image.indexOf('&list') !== -1) {
      return (image.replace(image.substring(0, image.indexOf('ch?v=') + 5), 'http://img.youtube.com/vi/').replace(image.substring(image.indexOf('&list'), image.length), '').concat('/0.jpg'));
    }
    return (image.replace(image.substring(0, image.indexOf('ch?v=') + 5), 'http://img.youtube.com/vi/').concat('/0.jpg'));
  } else {
    return "";
  }
}


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
          const id = NewsPosts.insert(data);
          Meteor.call('postTweet', `${data.title} ${process.env.URL}/news/${id}`);
          Meteor.call('publishToFacebook', id);
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
    },

    addFacebookObject() {
      NewsPosts.find().fetch().map(data => {
        let image = getImage(data);
        let facebookObject = `
          <meta property="fb:app_id" content="989352457849190"/>
          <meta property="og:title" content="${data.title}"/>
          <meta property="og:site_name" content="Bombers-Hockey"/>
          <meta property="og:url" content="${process.env.URL}/news/${data._id}"/>
          <meta property="og:type" content="article" />
          <meta property="og:image" content="${image}" />
          `;
        NewsPosts.update({_id: data._id}, {$set: {facebook: facebookObject}});
      })
    },

    removeFacebookFromText() {
      NewsPosts.find().fetch().map(data => {
        let image = getImage(data);
        let text = data.text;
        let facebookObject = `
          <meta property="fb:app_id" content="989352457849190"/>
          <meta property="og:title" content="${data.title}"/>
          <meta property="og:site_name" content="Bombers-Hockey"/>
          <meta property="og:url" content="${process.env.URL}/news/${data._id}"/>
          <meta property="og:type" content="article" />
          <meta property="og:image" content="${image}" />
          `;
        text = text.replace(facebookObject, '');
        NewsPosts.update({_id: data._id}, {$set: {text: text}});
      })
    }
  });
