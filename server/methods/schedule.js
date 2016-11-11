import fs from 'fs';
import { Schedule } from '../../lib/collections.js';

Meteor.methods({
  scheduleImages() {
    return fs.readdirSync('../web.browser/assets/schedule');
  },

  addEvent(eventObject) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler'])) {
      try {
        Schedule.insert(eventObject);
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
    return 'Event deleted';
  },

  updateEvent(id, event) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler'])) {
      try {
        Schedule.update({_id: id}, {$set: {
                                            date: event.date,
                                            image: event.image,
                                            description: event.description,
                                            signupable: event.signupable
                                          }
        });
      }
      catch(err) {
        throw new Meteor.Error(`Could not update event: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or don't have permission to update events`);
    }
  },

  signupToEvent(id) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Team-member'])) {
      try {
        Schedule.update({_id: id}, {$push: {registered: Meteor.user()._id}});
      }
      catch(err) {
        throw new Meteor.Error(`Could not sign you up: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or not a team-member`);
    }
    return `You've been signed up for the event`;
  },

  unRegisterFromEvent(id) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Team-member'])) {
      try {
        Schedule.update({_id: id}, {$pull: {registered: Meteor.user()._id}});
      }
      catch (err) {
        throw new Meteor.Error(`could not remove you: ${err}`);
      }
    } else {
      throw new Meteor.Error(`You're not logged in or not a team-member`);
    }
    return `Unregistered from event`;
  }
})
