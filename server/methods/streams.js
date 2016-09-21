Meteor.methods({
    addTwitchName(name) {
      if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
        try {
          TwitchNames.insert({name: name});
        }
        catch(error) {
          throw new Meteor.Error(`Could not add twitch stream: ${error}`);
        }
      } else {
        throw new Meteor.Error(`You're not logged in or lack permission to add streams`);
      }
      return 'Twitch stream added';
    },

    updateTwitchName(id, name) {
      if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
        try {
          TwitchNames.upsert({_id: id}, {$set: {name: name}});
        }
        catch(error) {
          throw new Meteor.error(`Could not update twitch stream: ${error}`);
        }
      } else {
        throw new Meteor.error(`You're not logged in or lack permission to update streams`);
      }
      return 'Twitch stream updated';
    },

    removeTwitchName(name) {
      if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
        try {
          TwitchNames.remove({name: name});
        }
        catch(error) {
          throw new Meteor.Error(`Could not remove Twitch stream: ${error}`);
        }
        Streams.remove({name: name});
      } else {
        throw new Meteor.Error(`You're not logged in or lack permission to remove streams`);
      }
      return 'Twitch stream removed';
    },

    getStreams() {
      TwitchNames.find().fetch().forEach((data) => {
        let result = Meteor.http.call('GET', `https://api.twitch.tv/kraken/streams/${data.name}?client_id=${process.env.TWTCH_ID}`).data;
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
