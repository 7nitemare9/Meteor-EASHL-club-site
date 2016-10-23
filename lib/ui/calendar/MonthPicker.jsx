import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class MonthPicker extends TrackerReact(Component) {

  render() {
    return (
      <div className="date-picker">
        <div className="cal-previous fa fa-angle-left" onClick={() => this.props.func(-1)} ></div>
        <span className="cal-month">{moment(this.props.month, 'MM-YYYY').format('MMMM YYYY')}</span>
        <div className="cal-next fa fa-angle-right" onClick={() => this.props.func(1)} ></div>
      </div>
    )
  }
}
