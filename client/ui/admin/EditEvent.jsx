import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import 'react-date-picker/index.css'
import { DateField, Calendar } from 'react-date-picker'

export default class AdmEditEvent extends TrackerReact(Component) {

  updateEvent(event) {
    event.preventDefault();
    console.log(this.refs.dateAndTime.p.value, this.refs.image.value);
    Meteor.call('updateEvent', this.props.id, this.refs.dateAndTime.p.value, this.refs.image.value);
  }


  getEvent() {
    return Schedule.findOne({_id: this.props.id}).date;
  }

  getImage() {
    return Schedule.findOne({_id: this.props.id}).image;
  }

  render() {
    this.state = {subscribe: {event: Meteor.subscribe('oneEvent', this.props.id)}}
    if (!this.state.subscribe.event.ready()) {
      return (<div>Loading...</div>)
    }
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
        <form onSubmit={this.updateEvent.bind(this)}>
        <DateField
          ref="dateAndTime"
          dateFormat="YYYY-MM-DD HH:mm"
          defaultValue={this.getEvent()}
          date={Date.now()}
          />
          <select ref="image" defaultValue={this.getImage()}>
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
