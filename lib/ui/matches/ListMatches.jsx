import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PrevNext from './PrevNext.jsx';

export default class ListMatches extends TrackerReact(Component) {

  componentWillReceiveProps() {
    console.log('receive props');
    this.state.subscription.matches.stop();
  }

  skipValue() {
    if (this.props.page == 0) {
      return 0;
    }
    return 5;
  }

  getMatches() {
    return Matches.find({}, {sort: {timestamp: -1}, skip: this.skipValue(), limit: 15}).fetch();
  }

  resultColor(match) {
    if (match.game_teams[0].name === "Bombers Hockey") {
      if (match.game_teams[0].score > match.game_teams[1].score) {
        return "#4a4";
      }
      return "#a44";
    }
    if (match.game_teams[1].score > match.game_teams[0].score) {
      return "#4a4";
    }
    return "#a44";
  }

  render() {
    this.state = {subscription:
      {matches: Meteor.subscribe('tenMatches', this.props.page * 15)}};
    if (!this.state.subscription.matches.ready()) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>RESULTS</p2>
              </p>
              <br/>
              {this.getMatches().map((match) => {
                if (match.game_teams.length < 2) {
                  return <div></div>
                }
                return (
                  <li className="list-group-item">
                    <a href={`/matches/${match._id}`}>{`${match.game_teams[0].name} - ${match.game_teams[1].name}`}</a>
                    <span className="badge pull-right" style={{background: this.resultColor(match)}} >
                      {`${match.game_teams[0].score} - ${match.game_teams[1].score}`}
                    </span>
                  </li>
                )
              })}
              <PrevNext page={this.props.page} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}