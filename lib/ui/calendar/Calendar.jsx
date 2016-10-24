import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MonthPicker from './MonthPicker.jsx';
import DayNames from './DayNames.jsx';
import Weeks from './Weeks.jsx';
import Box from '../commonCSS/box.js';

export default class Calendar extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {today: moment().startOf('day').format('YYYY-MM-DD')};
    this.state.calendarMonth = moment().startOf('month').format('MM-YYYY');
    Meteor.setTimeout(this.newDay, moment.duration(moment().add(1, 'day').startOf('day').diff(moment()))._milliseconds + 1000);
    this.style = {
      box: Object.assign({}, Box.box, {
        width: '310px',
        margin: '10px 0'
      })
    }
  }

  newDay() {
    this.setState({today: moment().startOf('day').format('YYYY-MM-DD')});
    Meteor.setTimeout(this.newDay, moment.duration(moment().add(1, 'day').startOf('day').diff(moment()))._milliseconds + 1000);
  }

  changeMonth(amount) {
    this.setState({calendarMonth: moment(this.state.calendarMonth, 'MM-YYYY').add(amount, 'month').format('MM-YYYY')});
  }

  render() {
    return (
        <div style={this.style.box}>
          <div style={Box.header}>
            <img src="/assets/calendar.png" alt=""/>
          </div>
          <div>
            <MonthPicker month={this.state.calendarMonth} func={this.changeMonth.bind(this)}/>
            <DayNames/>
            <Weeks today={this.state.today} month={this.state.calendarMonth}/>
          </div>
        </div>
      // </div>
    )
  }
}
