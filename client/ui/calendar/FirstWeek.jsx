import React, { Component } from 'react';

export default class FirstWeek extends Component {

  render() {
    return (
      <div>
        {this.props.week.map((day) => {
          if (day > 20) {
            return <span key={`lm-day${day}`} className="cal-date-other-month">{day}</span>
          }
          return (
            <span key={`day${day}`} className="cal-date">{day}</span>
          )
        })}
      </div>
    )
  }
}
