import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GamePlayers from './GamePlayers.jsx';
import BoxScore from './BoxScore.jsx';

export default class ShowMatch extends TrackerReact(Component) {

  componentWillMount() {
    this.state = {subscription: {match: Meteor.subscribe('oneMatch', this.props.id)}};
  }

  getMatch() {
    return Matches.findOne({_id: this.props.id})
  }

  render() {
    if (!this.state.subscription.match.ready()) {
      return <div>Loading...</div>
    }
    let match = this.getMatch();
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="scorebox" >
            <div className="away_name">{match.game_teams[0].name}</div>
            <div className="away_score">{match.game_teams[0].score}</div>
            <div className="home_score">{match.game_teams[1].score}</div>
            <div className="home_name">{match.game_teams[1].name}</div>
          </div>
          <GamePlayers players={match.game_players} hometeam={match.game_teams[1].clubId}/>
          <BoxScore players={match.game_players} teams={match.game_teams} />
      </div>
    </div>
    )
  }
}
