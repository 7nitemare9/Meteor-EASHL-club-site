import React, { Component } from 'react';
import MonthPicker from './MonthPicker.jsx';
import DayNames from './DayNames.jsx';
import Weeks from './Weeks.jsx';

export default class Calendar extends Component {
  constructor() {
    super();
    Session.set('today', moment().startOf('day').format('YYYY-MM-DD'));
    Session.set('calendar-month', moment().startOf('month').format('MM-YYYY'));
  }

  render() {
    return (
      <div className="col-lg-3 col-lg-pull-6 col-md-4 b_column col-sm-6 col-xs-12">
        <div className="b_box">
          <div className="b_header">
            <img src="/assets/calendar.png" alt=""/>
          </div>
          <div className="calendar">
            <MonthPicker />
            <DayNames />
            <Weeks />
          </div>
        </div>
      </div>
    )
  }
}
