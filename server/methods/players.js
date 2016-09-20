Meteor.methods({
  getPlayers() {
    const platform = process.env.PLATFORM;
    const club = process.env.CLUB_ID;
    let players = Meteor.http.call('GET', `http://www.easports.com/iframe/nhl14proclubs/api/platforms/${platform}/clubs/${club}/members`).data.raw[0];
    for(player in players) {
      const stats = Meteor.http.call('GET', `http://www.easports.com/iframe/nhl14proclubs/api/platforms/${platform}/members/${player}/stats`).data.raw;
      Players.upsert({name: players[player].name}, {$set: stats[Object.keys(stats)[0]]});
    }
  }
})
