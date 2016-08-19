import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  let Streams = Meteor.setInterval(function() {
    Meteor.call('getStreams');
    }, 60000);
  Meteor.call('getTweets2');
});
