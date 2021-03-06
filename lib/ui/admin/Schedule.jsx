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
    let eventObject = {
      date: this.refs.dateAndTime.p.value,
      image: this.refs.image.value.trim(),
      description: this.refs.description.value.trim(),
      signupable: this.refs.signupable.checked
    }
    Meteor.call('addEvent', eventObject, this.onComplete.bind(this));
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
                  <br/>
                  description:
                  <input type="text" ref="description" />
                  <br/>
                  Allow signing up to event:
                  <input type="checkbox" ref="signupable" />
                  <br/>
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
