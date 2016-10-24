import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Colors from '../commonCSS/colors.js';

export default class MonthPicker extends TrackerReact(Component) {
  constructor() {
    super();
    this.style = {
      datePicker: {
        background: `linear-gradient(${Colors.lightGrey}, ${Colors.darkestGrey})`,
        color: Colors.secondary,
        borderRadius: '4px',
        border: '1px solid'
      },
      calPrevious: {
        marginLeft: '20px'
      },
      calMonth: {
        fontWeight: 'bold',
        color: Colors.secondary,
        textAlign: 'center',
        display: 'inline-block',
        width: '247px'
      },
      calNext: {
        marginRight: '20px'
      }
    }
  }

  render() {
    return (
      <div style={this.style.datePicker}>
        <div style={this.style.calPrevious} className="fa fa-angle-left" onClick={() => this.props.func(-1)} ></div>
        <span style={this.style.calMonth}>{moment(this.props.month, 'MM-YYYY').format('MMMM YYYY')}</span>
        <div style={this.style.calNext} className="fa fa-angle-right" onClick={() => this.props.func(1)} ></div>
      </div>
    )
  }
}
