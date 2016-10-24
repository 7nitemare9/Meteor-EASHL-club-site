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
    while(newDate.month() <= startDate.month() && newDate.year() <= startDate.year()) {
      weeks.push(this.createWeek(newDate));
      newDate.add(1, 'w').day('Monday');
    }
    return weeks;
  }

  render() {
    return (
      <div>
      {this.createWeeks(moment(this.props.month, 'MM-YYYY').startOf('month')).map((data, index) => {
        if(index == 0 && data[0] > data[6]) {
          return (
            <FirstWeek key={`week${index}`} week={data} today={this.props.today} month={this.props.month}/>
          )
        } else if (index > 2 && data[0] > data[6]) {
          return (
            <LastWeek key={`week${index}`}week={data} today={this.props.today} month={this.props.month} />
          )
        }
        return (
          <Week key={`week${index}`}week={data} today={this.props.today} month={this.props.month}/>
        )
        })
      }
      </div>
    )
  }
}
