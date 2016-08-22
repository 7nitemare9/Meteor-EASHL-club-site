import React, { Component } from 'react';

export default class DayNames extends Component {

  render() {
    return (
      <div className="cal-days">
        <span className="cal-day">Mon</span>
        <span className="cal-day">Tue</span>
        <span className="cal-day">Wed</span>
        <span className="cal-day">Thu</span>
        <span className="cal-day">Fri</span>
        <span className="cal-day">Sat</span>
        <span className="cal-day">Sun</span>
      </div>
    )
  }
}
