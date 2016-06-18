NewsPosts = new Mongo.Collection('newsPosts');
LastMatches = new Mongo.Collection('latestMatches')
Resolutions = new Mongo.Collection('resolutions');


Meteor.publish('allResolutions', function() {
    return Resolutions.find();
});

Meteor.publish('allNews', function() {
    return NewsPosts.find();
});

Meteor.publish('lastMatches', function() {
  return LastMatches.find();
})

Meteor.publish('userResolutions', function() {
    return Resolutions.find({user: this.userId});
});
