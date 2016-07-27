import fs from 'fs';

Meteor.methods({
  scheduleImages() {
    return fs.readdirSync('../web.browser/assets/schedule');
  },
  addEvent(date, image) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler'])) {
      Schedule.insert({date: date, image: image});
    }
  },
  deleteEvent(id) {
    if (Roles.userIsInRole(Meteor.user(), ['Adimn', 'Event-scheduler'])) {
      Schedule.remove({_id: id});
    }
  },
  updateEvent(id, date, image) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler'])) {
      Schedule.update({_id: id}, {$set: {date: date, image: image}});
    }
  }
})
