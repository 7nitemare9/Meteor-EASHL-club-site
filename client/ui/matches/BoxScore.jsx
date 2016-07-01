import React, { Component } from 'react';
import PlayerTables from './PlayerTables.jsx';

export default class BoxScore extends Component {

  render() {
    return (
      <div className="boxscore">
        <p><img align="absmiddle" src="/assets/boxscore/Scorecard.jpg" /></p>
        <div className="tcenter">
          <div className="team">{this.props.teams[0].name}</div>
          <PlayerTables players={this.props.players} team={this.props.teams[0].clubId} />
          <div className="team">{this.props.teams[1].name}</div>
          <PlayerTables players={this.props.players} team={this.props.teams[1].clubId} />
        </div>
      </div>
    )
  }
}
