import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  SharedSettings.upsert({name: 'url'}, {$set: {value: process.env.URL}});
  SharedSettings.upsert({name: 'fbAppId'}, {$set: {value: process.env.FBK_APP_ID}});
  SharedSettings.upsert({name: 'teamName'}, {$set: {value: process.env.TEAM_NAME}});
  let Streams = Meteor.setInterval(function() {
    Meteor.call('getStreams');
    }, 60000);
    Meteor.call('getTweets2');
});
