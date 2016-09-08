import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class LatestMatches extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        latestMatches: Meteor.subscribe('lastMatches')
      }
    }
    this.state.subscription.settings = Meteor.subscribe('sharedSettings');
    this.style = {
      width: '310px',
      margin: '10px 0'
    }
  }

  componentWillUnmount() {
    this.state.subscription.latestMatches.stop();
  }

  getSetting(setting) {
    return SharedSettings.findOne({name: setting}).value;
  }

  matchData() {
    return Matches.find({}, {sort: {timestamp: -1}, limit: 5}).fetch();
  }

  shortenIfToLong(string) {
    if (typeof string === "string") {
      if (string.length > 14) {
        return string.slice(0,11).concat('...');
      }
      return string;
    }
    return "deleted team";
  }

  winOrLoss(data) {
    if (data.game_teams[1].name == this.getSetting('teamName')) {
      if (data.game_teams[1].score > data.game_teams[0].score) {
        return "#4a4";
      }
    } else {
      if (data.game_teams[0].score > data.game_teams[1].score) {
        return "#4a4";
      }
    }
    return "#a44";
  }

  render() {
    if(!this.state.subscription.latestMatches.ready()) {
      return (
          <div>Loading...</div>
      )
    } else {
      return (
        // <div className="col-lg-3 b_column col-lg-pull-6 col-md-4 col-sm-6 col-xs-6">
          <div className="b_box" style={this.style}>
            <div className="b_header">
              <img src="/assets/latestgames.png" />
            </div>
            {this.matchData().map((data) => {
              return (
                <li key={data._id} className="list-group-item">
                  <a href={`/matches/${data._id}`}>{`${this.shortenIfToLong(data.game_teams[0].name)} - ${this.shortenIfToLong(data.game_teams[1].name)}`}</a>
                  <span className="badge pull-right" style={{background: this.winOrLoss(data)}}>{`${data.game_teams[0].score} - ${data.game_teams[1].score}`}</span>
                </li>
              )
            })}
          </div>
        // </div>
      )
    }
  }
}
