Meteor.methods({
    addTwitchName(name) {
      TwitchNames.insert({name: name});
    },
    removeTwitchName(name) {
      TwitchNames.remove({name: name});
      Streams.remove({name: name});
    },
    getStreams() {
      TwitchNames.find().fetch().forEach((data) => {
        console.log(data.name);
        let result = Meteor.http.call('GET', `https://api.twitch.tv/kraken/streams/${data.name}`).data;
        if (result.stream) {
          if (!Streams.findOne({name: data.name})) {
            Streams.insert({name: data.name});
          }
        } else if (Streams.findOne({name: data.name})) {
          Streams.remove({name: data.name});
        }
      });
    },
    checkStreams() {
      Streams.find().fetch().forEach((data) => {
        console.log(data.name);
      })
    }
})
