import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Skaters from './skaters.jsx';
import Goalies from './goalies.jsx';

export default class Statistics extends TrackerReact(Component) {
  constructor() {
    super();
    Session.set('full', 1);
  }

  getPlayerStats(position) {
    return PlayerStats.findOne()[position]
  };

  toggleFull() {
    if (Session.get('full') === 1) {
      Session.set('full', 0);
    } else {
      Session.set('full', 1);
    }
  }

  css() {
    return {
      textAlign: 'center',
    }
  }

  render() {
    this.state = {subscription: {playersStats: Meteor.subscribe('playerStats')}};
    if (!this.state.subscription.playersStats.ready()) {
      return (<div>Loading...</div>)
    }
    return (<div className="b_box" >
                <div className="b_box" >
                  <div className="content">
                    <p>
                      <img src="/assets/blank.jpg" />
                      <p2>STATISTICS</p2>
                    </p>
                    <a href="#" onClick={this.toggleFull}>All/Per Game</a>
                    <h6 style={this.css()} >Forwards</h6>
                    <Skaters full={Session.get('full')} skaters={this.getPlayerStats('forwards')}/>
                    <h6 style={this.css()} >Defenders</h6>
                    <Skaters full={Session.get('full')} skaters={this.getPlayerStats('defenders')}/>
                    <h6 style={this.css()} >Goalies</h6>
                    <Goalies full={Session.get('full')} goalies={this.getPlayerStats('goalies')}/>
                  </div>
                </div>
              </div>
    )
  };
}
