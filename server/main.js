import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  require('dotenv').config({path: 'e:\\winfiles\\users\\nitemare\\meteor\\mr\\.env'});
  // code to run on server at startup
  // Meteor.setInterval(function() {
  //   console.log('interval running on server');}, 5000);
  var Streams = Meteor.setInterval(function() {
  Meteor.call('getStreams');
   }, 60000);
  Meteor.call('getTweets2');
});
