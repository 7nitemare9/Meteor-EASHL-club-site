import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import 'react-date-picker/index.css'
import { DateField, Calendar } from 'react-date-picker'

export default class Schedule extends TrackerReact(Component) {

  addEvent(event) {
    event.preventDefault();
    console.log(this.refs.dateAndTime.p.value, this.refs.image.value);
    Meteor.call('addEvent', this.refs.dateAndTime.p.value, this.refs.image.value);
  }

  render() {
    Meteor.call('scheduleImages', (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        Session.set('images', data);
      }
    });
    if (!Session.get('images')) {
      return (<div>Loading....</div>)
    }
    return (
      <div>
        <form onSubmit={this.addEvent.bind(this)}>
        <DateField
          ref="dateAndTime"
          dateFormat="YYYY-MM-DD HH:mm"
          date={Date.now()}
          />
          <select ref="image">
            {Session.get('images').map((image) => {
            return (
              <option value={`assets/schedule/${image}`}>{image.substring(0, image.length - 4)}</option>
              )
            })}
          </select>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}
