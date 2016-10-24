import React, { Component } from 'react';
import Colors from '../commonCSS/colors.js';

export default class DayNames extends Component {
  constructor() {
    super();
    this.style = {
      calDays: {
        display: 'flex',
        justifyContent: 'space-around',
        color: Colors.secondary
      },
      calDay: {
        textAlign: 'center',
        display: 'inline-block',
        width: '42px',
        fontSize: '10px',
        fontWeight: 'bold'
      }
    }
  }

  render() {
    return (
      <div style={this.style.calDays}>
        <span style={this.style.calDay}>Mon</span>
        <span style={this.style.calDay}>Tue</span>
        <span style={this.style.calDay}>Wed</span>
        <span style={this.style.calDay}>Thu</span>
        <span style={this.style.calDay}>Fri</span>
        <span style={this.style.calDay}>Sat</span>
        <span style={this.style.calDay}>Sun</span>
      </div>
    )
  }
}
