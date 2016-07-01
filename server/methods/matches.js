Meteor.methods({
    getEAData() {
        data = Meteor.http.call('GET', 'http://www.easports.com/iframe/nhl14proclubs/api/platforms/ps4/clubs/33778/matches', { params: {
            filters: 'sum, pretty',
                match_type: 'gameType5',
                matches_returned: 10
        }});
        //console.log(data);

    },
    getMatches() {
      // Matches.remove({});
      Meteor.http.call('GET', "http://bombers-hockey.com/matches.json").data.forEach(function(data) {
        console.log(data.timestamp);
        if (!Matches.find(data.timestamp)) {
          console.log(data);
          Matches.insert()
        }
      })
    },
    checkMatch() {
      let temp = Matches.find().fetch();
      temp.forEach(function(data) {
        console.log(data.timestamp);
        console.log(data.awayteam);
        console.log(data.awayscore);
        console.log(data.hometeam);
        console.log(data.homescore);
      })
    }
})
