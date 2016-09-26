import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Skaters from './skaters.jsx';
import Goalies from './goalies.jsx';

export default class Statistics extends TrackerReact(Component) {
  constructor() {
    super();
    Session.set('full', 1);
  }

  getPlayerStats() {
    return PlayerStats.findOne()
  };

  getSkaterStats(playerStats) {
    console.log(playerStats)
    let skaters = [];
    for(player in playerStats) {
      if (playerStats[player].skgp > 0) {
        skaters.push(playerStats[player]);
      }
    }
    return skaters;
  };

  getGoalieStats(playerStats) {
    console.log(playerStats)
    let goalies = [];
    for(player in playerStats) {
      if (playerStats[player].glgp > 0) {
        goalies.push(playerStats[player]);
      }
    }
    return goalies;
  };

  toggleFull() {
    if (Session.get('full') === 1) {
      Session.set('full', 0);
    } else {
      Session.set('full', 1);
    }
  }

  render() {
    this.state = {subscription: {playersStats: Meteor.subscribe('playerStats')}};
    return (
      <div>
        <a href="#" onClick={this.toggleFull}>All/Per Game</a>
        <Skaters full={Session.get('full')} skaters={this.getSkaterStats(this.getPlayerStats())}/>
        <Goalies full={Session.get('full')} goalies={this.getGoalieStats(this.getPlayerStats())}/>
      </div>
    )
  };
}
