import React, { Component } from 'react';

export default class LastWeek extends Component {

  render() {
    return (
      <div>
        {this.props.week.map((day) => {
          if (day < 20) {
            return <span key={`nm-day${day}`} className="cal-date-other-month">{day}</span>
          }
          return (
            <span key={`day${day}`} className="cal-date">{day}</span>
          )
        })}
      </div>
    )
  }
}
