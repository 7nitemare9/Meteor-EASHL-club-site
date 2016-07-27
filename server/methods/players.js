Meteor.methods({
  getPlayers() {
    Players.remove({});
    Meteor.http.call('GET', "http://54.170.53.83/players.json").data.forEach((data) => {
      console.log(data);
      Players.insert(data);
    })
  }
})
