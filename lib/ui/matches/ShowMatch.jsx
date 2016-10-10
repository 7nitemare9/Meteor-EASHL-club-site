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

  getCSS(name) {
    switch(name) {
      case 'awayName' :
        return {
          fontSize: '18px',
          color: '#fff',
          position: 'absolute',
          display: 'table',
          width: '260px',
          height: '46px'
        }
      case 'matchP' :
        return {
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center'
        }
      case 'awayScore' :
        return {
          fontSize: '12px',
          position: 'absolute',
          display: 'table',
          marginLeft: '260px',
          width: '46px',
          height: '46px'
        }
      case 'homeScore' :
        return {
          fontSize: '12px',
          position: 'absolute',
          display: 'table',
          marginLeft: '345px',
          width: '46px',
          height: '46px'
        }
      case 'homeName' :
        return {
          marginLeft: '389px',
          fontSize: '18px',
          color: '#fff',
          position: 'absolute',
          display: 'table',
          width: '248px',
          height: '46px'
        }
    }
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
            <div style={this.getCSS("awayName")}><p style={this.getCSS("matchP")}>{match.game_teams[0].name}</p></div>
            <div style={this.getCSS("awayScore")}><p style={this.getCSS("matchP")}>{match.game_teams[0].score}</p></div>
            <div style={this.getCSS("homeScore")}><p style={this.getCSS("matchP")}>{match.game_teams[1].score}</p></div>
            <div style={this.getCSS("homeName")}><p style={this.getCSS("matchP")}>{match.game_teams[1].name}</p></div>
          </div>
          <GamePlayers players={match.game_players} hometeam={match.game_teams[1].clubId}/>
          <BoxScore players={match.game_players} teams={match.game_teams} />
      </div>
    </div>
    )
  }
}
