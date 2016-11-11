import { Meteor } from 'meteor/meteor';
import { SharedSettings } from '../lib/collections.js';

Meteor.startup(() => {
  SharedSettings.upsert({name: 'url'}, {$set: {value: process.env.URL}});
  SharedSettings.upsert({name: 'fbAppId'}, {$set: {value: process.env.FBK_APP_ID}});
  SharedSettings.upsert({name: 'teamName'}, {$set: {value: process.env.TEAM_NAME}});
  let Streams = Meteor.setInterval(function() {
    Meteor.call('getStreams');
    }, 60000);
  Meteor.call('getTweets2');
  let eaData = Meteor.setInterval(function() {
    Meteor.call('getEAData');
  }, 900000);
  let playerData = Meteor.setInterval(function() {
    Meteor.call('getPlayers');
  }, 60*60*1000);
});
