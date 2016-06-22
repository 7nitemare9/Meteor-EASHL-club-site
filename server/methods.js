/**
 * Created by nitemare on 2016-06-13.
 */
import { TWITTERKEYS } from '../secrets.js';
import StreamTweets from 'stream-tweets';

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
    getTweets() {
      console.log('getting Tweets');
      Meteor.http.call('GET', "http://bombers-hockey.com/tweets.json").data.forEach((data) => {
        if (!Tweets.findOne({id: data.id})) {
          console.log('added tweet');
          Tweets.insert(data);
        }
      })
    },
    getTweets2() {
      console.log(StreamTweets);
      let following = ['50004938', '33936681', '25660180'];
      var st = new StreamTweets(TWITTERKEYS, false);
      st.stream({follow: following}, Meteor.bindEnvironment(function(result) {
        console.log(result.text);
        if (following.indexOf(result.user.id.toString()) != -1 && !result.in_reply_to_user_id) {
          console.log('new tweet');
            if (!Tweets.findOne({id: result.id})) {
              Tweets.insert(result);
              console.log('added');
            }
            console.log('already exists');
        }
        console.log(`user ${result.user.name} reply: ${result.in_reply_to_user_id}`);
      }, function(e) { throw e; }));
    },
    addTwitchName(name) {
      TwitchNames.insert({name: name});
    },
    removeTwitchName(name) {
      TwitchNames.remove({name: name});
      Streams.remove({name: name});
    },
    getStreams() {
      TwitchNames.find().fetch().forEach((data) => {
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

    // Checks for data in Db for debugging purposes
    checkMatch() {
      let temp = LastMatches.find().fetch();
      temp.forEach(function(data) {
        console.log(data.timestamp);
        console.log(data.awayteam);
        console.log(data.awayscore);
        console.log(data.hometeam);
        console.log(data.homescore);
      })
    },
    checkTweets(idx) {
      Tweets.find({}, {sort: {created_at: -1}}, {limit: 5}).forEach((data, index) => {
        if (idx == index) {
          console.log(data);
        }
      });
    },
    checkStreams() {
      Streams.find().fetch().forEach((data) => {
        console.log(data.name);
      })
    }

});
