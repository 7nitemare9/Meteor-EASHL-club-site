import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

LastMatches = new Mongo.Collection('latestMatches');

export default class LatestMatches extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {
      subscription: {
        latestMatches: Meteor.subscribe('lastMatches')
      }
    }
  }

  componentWillUnmount() {
    this.state.subscription.latestMatches.stop();
  }

  matchData() {
    return LastMatches.find().fetch();
  }

  shortenIfToLong(string) {
    if (string.length > 14) {
      return string.slice(0,11).concat('...');
    }
    return string;
  }

  winOrLoss(data) {
    if (data.hometeam == "Bombers Hockey") {
      if (data.homescore > data.awayscore) {
        return "#4a4";
      }
    } else {
      if (data.awayscore > data.homescore) {
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
        <div className="col-lg-3 b_column col-lg-pull-6 col-md-3 col-sm-6 col-xs-12">
          <div className="b_box">
            <div className="b_header">
              <img src="/assets/latestgames.png" />
            </div>
            {this.matchData().map((data) => {
              return (
                <li key={data._id} className="list-group-item">
                  <a href={`/matches/${data._id}`}>{`${this.shortenIfToLong(data.awayteam)} - ${this.shortenIfToLong(data.hometeam)}`}</a>
                  <span className="badge pull-right" style={{background: this.winOrLoss(data)}}>{`${data.awayscore} - ${data.homescore}`}</span>
                </li>
              )
            })}
          </div>
        </div>
      )
    }
  }
}
