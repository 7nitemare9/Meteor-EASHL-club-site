import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import 'react-date-picker/index.css';
import { DateField, Calendar } from 'react-date-picker';

export default class Schedule extends TrackerReact(Component) {

  onComplete(err, data) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    } else {
      Bert.alert('Event added', 'success', 'fa-check');
      FlowRouter.go('/');
    }
  }

  addEvent(event) {
    event.preventDefault();
    Meteor.call('addEvent', this.refs.dateAndTime.p.value, this.refs.image.value, this.onComplete.bind(this));
  }

  render() {
    Meteor.call('scheduleImages', (error, data) => {
      if (error) {
      } else {
        Session.set('images', data);
      }
    });
    if (!Session.get('images')) {
      return (<div>Loading....</div>)
    }
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>Add Event</p2>
              </p>
              <div className="adm-content">
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}
