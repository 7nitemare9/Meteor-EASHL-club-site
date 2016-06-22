import React, { Component } from 'react';

export default class Week extends Component {

  render() {
    let today = moment(Session.get('today'), 'YYYY-MM-DD').format('YYYY-MM-DD');
    return (
      <div>
        {this.props.week.map((day) => {
          let thisday = moment(Session.get('calendar-month'), 'MM-YYYY').date(day).format('YYYY-MM-DD');
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
