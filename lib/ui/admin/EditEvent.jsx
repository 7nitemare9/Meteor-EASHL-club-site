import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
// import 'react-date-picker/index.css'
import { DateField, Calendar } from 'react-date-picker';

export default class AdmEditEvent extends TrackerReact(Component) {
  constructor () {
    super();
    Session.set('images', "");
  }

  onComplete(err, data) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    } else {
      Bert.alert('Event updated', 'success', 'fa-check');
      FlowRouter.go('/');
    }
  }

  updateEvent(event) {
    event.preventDefault();
    Meteor.call('updateEvent', this.props.id, this.refs.dateAndTime.p.value, this.refs.image.value, this.onComplete.bind(this));
  }

  getEvent() {
    return Schedule.findOne({_id: this.props.id}).date;
  }

  getImage() {
    return Schedule.findOne({_id: this.props.id}).image;
  }

  setScheduleImages() {
    Meteor.call('scheduleImages', (error, data) => {
      if (error) {
        console.log(error);
      } else {
        Session.set('images', data);
      }
    });
  }

  render() {
    this.state = {subscribe: {event: Meteor.subscribe('oneEvent', this.props.id)}}
    this.setScheduleImages();

    if (!this.state.subscribe.event.ready()) {
      return (<div>Loading event...</div>)
    }

    if (!Session.get('images')) {
      return (<div>Loading images...</div>)
    }
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>Edit Event</p2>
              </p>
              <div className="adm-content">
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}
