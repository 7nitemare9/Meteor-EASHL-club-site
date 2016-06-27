Meteor.methods({
    getEAData() {
        data = Meteor.http.call('GET', 'http://www.easports.com/iframe/nhl14proclubs/api/platforms/ps4/clubs/33778/matches', { params: {
            filters: 'sum, pretty',
                match_type: 'gameType5',
                matches_returned: 10
        }});
        //console.log(data);

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
})
