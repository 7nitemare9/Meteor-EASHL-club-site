Meteor.methods({
  getPlayers() {
    Players.remove({});
    Meteor.http.call('GET', "http://bombers-hockey.com/players.json").data.forEach((data) => {
      console.log(data);
      Players.insert(data);
    })
  }
})
