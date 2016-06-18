NewsPosts = new Mongo.Collection('newsPosts');
Resolutions = new Mongo.Collection('resolutions');


Meteor.publish('allResolutions', function() {
    return Resolutions.find();
});

Meteor.publish('allNews', function() {
    return NewsPosts.find();
});

Meteor.publish('userResolutions', function() {
    return Resolutions.find({user: this.userId});
});