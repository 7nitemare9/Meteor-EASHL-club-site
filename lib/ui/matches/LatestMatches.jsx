import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Box from '../commonCSS/box.js';
import Colors from '../commonCSS/colors.js';


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
      box: Object.assign(Box.box, {
        width: '310px',
        margin: '10px 0'
      }),
      ul: {
        margin: '0px'
      },
      li: {
        even: {
          padding: '2px 15px 0px 15px',
          background: Colors.grey,
          border: 'none',
          minWidth: '200px',
          display: 'flex',
          justifyContent: 'space-between'
        },
        odd: {
          padding: '2px 15px 0px 15px',
          background: Colors.darkGrey,
          border: 'none',
          minWidth: '200px',
          display: 'flex',
          justifyContent: 'space-between'
        }
      },
      badge: {
        display: 'inline-block',
        height: '18px',
        minWidth: '10px',
        padding: '3px 7px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: '1',
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap',
        textAlign: 'center',
    borderRadius: '10px'
      }
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
      if (parseInt(data.game_teams[1].score) > parseInt(data.game_teams[0].score)) {
        return "#4a4";
      }
    } else {
      if (parseInt(data.game_teams[0].score) > parseInt(data.game_teams[1].score)) {
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
        <div style={this.style.box}>
            <div className="b_header">
              <img src="/assets/latestgames.png" />
            </div>
            <ul style={this.style.ul}>
              {this.matchData().map((data, idx) => {
                let color = this.winOrLoss(data);
                let badgeStyle = Object.assign({}, this.style.badge, {background: color});
                return (
                  <li key={data._id} style={idx % 2 == 0 ? this.style.li.even : this.style.li.odd}>
                    <a href={`/matches/${data._id}`}>{`${this.shortenIfToLong(data.game_teams[0].name)} - ${this.shortenIfToLong(data.game_teams[1].name)}`}</a>
                    <span style={badgeStyle}>
                      {`${data.game_teams[0].score} - ${data.game_teams[1].score}`}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        // </div>
      )
    }
  }
}
