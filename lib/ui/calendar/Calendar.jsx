import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MonthPicker from './MonthPicker.jsx';
import DayNames from './DayNames.jsx';
import Weeks from './Weeks.jsx';

export default class Calendar extends TrackerReact(Component) {
  constructor() {
    super();
    Session.set('today', moment().startOf('day').format('YYYY-MM-DD'));
    Meteor.setTimeout(this.newDay, moment.duration(moment().add(1, 'day').startOf('day').diff(moment()))._milliseconds + 1000);
    Session.set('calendar-month', moment().startOf('month').format('MM-YYYY'));
    this.style = {
      width: '310px',
      margin: '10px 0'
    }
  }

  newDay() {
    Session.set('today', moment().startOf('day').format('YYYY-MM-DD'));
    Meteor.setTimeout(this.newDay, moment.duration(moment().add(1, 'day').startOf('day').diff(moment()))._milliseconds + 1000);
  }

  render() {
    return (
      // <div className="col-lg-3 col-lg-pull-6 col-md-4 b_column col-sm-6 col-xs-6">
        <div className="b_box" style={this.style}>
          <div className="b_header">
            <img src="/assets/calendar.png" alt=""/>
          </div>
          <div className="calendar">
            <MonthPicker />
            <DayNames />
            <Weeks today={Session.get('today')}/>
          </div>
        </div>
      // </div>
    )
  }
}
