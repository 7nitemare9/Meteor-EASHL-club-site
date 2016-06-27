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
      NewsPosts.insert(data);
    }
})
