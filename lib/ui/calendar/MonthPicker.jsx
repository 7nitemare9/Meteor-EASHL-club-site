import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Session } from '../../../server/lib/session.js';

export default class MonthPicker extends TrackerReact(Component) {

  previousMonth(){
    Session.set('calendar-month',
                moment(Session.get('calendar-month'), 'MM-YYYY').add(-1, 'M').format('MM-YYYY'));
  }

  nextMonth(){
    Session.set('calendar-month',
                moment(Session.get('calendar-month'), 'MM-YYYY').add(1, 'M').format('MM-YYYY'));
  }

  render() {
    return (
      <div className="date-picker">
        <div className="cal-previous fa fa-angle-left" onClick={this.previousMonth} ></div>
        <span className="cal-month">{moment(Session.get('calendar-month'), 'MM-YYYY').format('MMMM YYYY')}</span>
        <div className="cal-next fa fa-angle-right" onClick={this.nextMonth} ></div>
      </div>
    )
  }
}
