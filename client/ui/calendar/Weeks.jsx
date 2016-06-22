import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Week from './Week.jsx';
import FirstWeek from './FirstWeek.jsx';
import LastWeek from './LastWeek.jsx';

export default class Weeks extends TrackerReact(Component) {

  createWeek(startDate) {
    weekdays = []
    for (var i = 0; i < 7; i++) {
      weekdays[i] = (startDate.clone().add(i, 'd').date());
    }
    return weekdays;
  }

  createWeeks(startDate) {
    weeks = [];
    let newDate = startDate.clone().day('Monday');
    while(newDate.month() <= startDate.month()) {
      weeks.push(this.createWeek(newDate));
      newDate.add(1, 'w').day('Monday');
    }
    return weeks;
  }

  render() {
    return (
      <div>
      {this.createWeeks(moment(Session.get('calendar-month'), 'MM-YYYY').startOf('month')).map((data, index) => {
        if(index == 0 && data[0] > data[6]) {
          return (
            <FirstWeek key={`week${index}`} week={data}/>
          )
        } else if (index > 2 && data[0] > data[6]) {
          return (
            <LastWeek key={`week${index}`}week={data}/>
          )
        }
        return (
          <Week key={`week${index}`}week={data} />
        )
        })
      }
      </div>
    )
  }
}
