import React, { Component } from 'react';

export default class GamePlayers extends Component {
  constructor() {
    super();
    this.secondHomeD = false;
    this.secondAwayD = false;
  }

  numToPos(number) {
    return ['g', 'rd', 'd', 'lw', 'c', 'rw'][number];
  }

  setClass(hometeam, player) {
    let pos = this.numToPos(player.position);
    if (hometeam === player.team) {
      if (pos === 'rd') {
        if (this.secondHomeD) {
          pos = 'ld';
        }
        this.secondHomeD = true;
      }
      return `h${pos}`;
    } else {
      if (pos === 'rd') {
        if (this.secondAwayD) {
          pos = 'ld';
        }
        this.secondAwayD = true;
      }
      return `a${pos}`;
    }
  }

  render() {
    return (
      <div className="box" id="rink">
        {this.props.players.map((player) => {
          return (
            <div key={player.id} className={this.setClass(this.props.hometeam, player)}>
              <img src={`https://avatar-ssl.xboxlive.com/avatar/${player.personaName}/avatarpic-l.png`} alt="" className="player_image"/>
              <div className="player_text_box">{player.personaName}</div>
            </div>
          )
        })}
      </div>
    )
  }
}
