import fs from 'fs';

Meteor.methods({
  scheduleImages() {
    return fs.readdirSync('../web.browser/assets/schedule');
  },
  addEvent(date, image) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler'])) {
      try {
        Schedule.insert({date: date, image: image});
      }
      catch(err) {
        throw new Meteor.Error(`could not add event: ${err}`);
      }
    } else {
      throw new Meteor.Error("You're not logged in or don't have permission to add events");
    }
  },
  deleteEvent(id) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler'])) {
      try {
        Schedule.remove({_id: id});
      }
      catch(err) {
        throw new Meteor.Error(`Could not delete event: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or don't have permission to delete events`);
    }
  },
  updateEvent(id, date, image) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler'])) {
      try {
        Schedule.update({_id: id}, {$set: {date: date, image: image}});
      }
      catch(err) {
        throw new Meteor.Error(`Could not update event: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or don't have permission to update events`);
    }
  }
})
