import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Skaters from './skaters.jsx';
import Goalies from './goalies.jsx';

export default class Statistics extends TrackerReact(Component) {

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

  render() {
    this.state = {subscription: {playersStats: Meteor.subscribe('playerStats')}};
    return (
      <div>
        <Skaters skaters={this.getSkaterStats(this.getPlayerStats())}/>
        <Goalies goalies={this.getGoalieStats(this.getPlayerStats())}/>
      </div>
    )
  };
}
