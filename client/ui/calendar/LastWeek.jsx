import React, { Component } from 'react';

export default class LastWeek extends Component {

  render() {
    let today = moment(Session.get('today'), 'YYYY-MM-DD').format('YYYY-MM-DD');
    return (
      <div>
        {this.props.week.map((day) => {
          let thisday = moment(Session.get('calendar-month'), 'MM-YYYY').date(day).format('YYYY-MM-DD');
          if (day < 20) {
            return <span key={`nm-day${day}`} className="cal-date-other-month">{day}</span>
          }
          if ( today === thisday ) {
            return <span key={`day${day}`} className="cal-today">{day}</span>
          }
          return (
            <span key={`day${day}`} className="cal-date">{day}</span>
          )
        })}
      </div>
    )
  }
}
