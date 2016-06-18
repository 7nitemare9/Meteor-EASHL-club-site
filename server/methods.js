/**
 * Created by nitemare on 2016-06-13.
 */
Meteor.methods({
    addResolution(resolution){
        check(resolution, String);
        if(!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        Resolutions.insert({
            text: resolution,
            complete: false,
            createdAt: new Date(),
            user: Meteor.userId()
        });
    },
    toggleResolution(resolution){
        check(resolution, Object);
        if(Meteor.userId() !== resolution.user) {
            throw new Meteor.Error('not-authorized');
        }
        Resolutions.update(resolution._id, {
            $set: {
                complete: !resolution.complete
            }
        });
    },
    removeResolution(resolution) {
        check(resolution, Object);
        if(Meteor.userId() !== resolution.user) {
            throw new Meteor.Error('not-authorized');
        }
        Resolutions.remove(resolution._id);
    },
    getEAData() {
        data = Meteor.http.call('GET', 'http://www.easports.com/iframe/nhl14proclubs/api/platforms/ps4/clubs/33778/matches', { params: {
            filters: 'sum, pretty',
                match_type: 'gameType5',
                matches_returned: 10
        }});
        //console.log(data);

    },
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
    getLatestMatches() {
      LastMatches.remove({});
      Meteor.http.call('GET', "http://bombers-hockey.com/matches.json").data.forEach(function(data) {
        console.log(data);
        LastMatches.insert({
          timestamp: data.timestamp,
          awayteam: data.game_teams[0].name,
          awayscore: data.game_teams[0].score,
          hometeam: data.game_teams[1].name,
          homescore: data.game_teams[1].score
        })
      })
    },
    checkMatch() {
      let temp = LastMatches.find().fetch();
      temp.forEach(function(data) {
        console.log(data.timestamp);
        console.log(data.awayteam);
        console.log(data.awayscore);
        console.log(data.hometeam);
        console.log(data.homescore);
      })
    }


});
