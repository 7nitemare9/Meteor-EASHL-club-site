import React, { Component } from 'react';

export default class AdmManualUpdates extends Component {

  updateMatches() {
    Meteor.call('getEAData');
  }

  updatePlayers() {
    Meteor.call('getPlayers');
  }

  updateStats() {
    Meteor.call('calculateStats');
  }

  css(type) {
    switch(type)  {
      case 'div':
        return {
          display: 'flex',
          justifyContent: 'space-around'
        }
      case 'button':
        return {
          color: '#fbb600',
          backgroundColor: '#4a4a4a',
          border: '0'
        }
    }
  }

  render() {
    return (
      <div className="b_box" >
        <div className="b_box" >
          <div className="content">
            <p>
              <img src="/assets/blank.jpg" />
              <p2>MANUAL UPDATES</p2>
            </p>
            <div style={this.css('div')}>
              <button style={this.css('button')} onClick={this.updateMatches}>Update Matches</button>
              <button style={this.css('button')} onClick={this.updatePlayers}>Update Players</button>
              <button style={this.css('button')} onClick={this.updateStats}>Update Statistics</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
