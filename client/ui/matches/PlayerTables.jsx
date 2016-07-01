import React, { Component } from 'react';
import GoalieTable from './GoalieTable';

export default class PlayerTables extends Component {
  constructor () {
    super();
    this.goalie = false;
  }

  render() {
    return(
      <table rules="all">
        <thead>
          <tr className="team_head">
            <th>GamerTag</th>
            <th className="cr">Position</th>
            <th className="cr">Points</th>
            <th className="cr">Goals</th>
            <th className="cr">Assists</th>
            <th className="cr">Shots</th>
            <th className="cr">PIM</th>
            <th className="cr">Hits</th>
            <th className="cr">FaceOffs Won</th>
            <th className="cr">+/-</th>
            <th className="cr">Take Aways</th>
            <th className="cr">GiveAways</th>
            </tr>
        </thead>
        <tbody>
          {this.props.players.map((player) => {
            if (player.team === this.props.team) {
              if(player.position == 0) {
                this.goalie = player;
              } else {
                return (
                  <tr>
                    <td>{player.personaName}</td>
                    <td className="cr">{['G', 'D', 'D', 'LW', 'C', 'RW'][player.position]}</td>
                    <td className="cr">{player.skpoints}</td>
                    <td className="cr">{player.skgoals}</td>
                    <td className="cr">{player.skassists}</td>
                    <td className="cr">{player.skshots}</td>
                    <td className="cr">{player.skpim}</td>
                    <td className="cr">{player.skhits}</td>
                    <td className="cr">{player.skfow}</td>
                    <td className="cr">{player.skplusmin}</td>
                    <td className="cr">{player.sktakeaways}</td>
                    <td className="cr">{player.skgiveaways}</td>
                  </tr>
                )
              }
            }
          })}
        </tbody>
        <GoalieTable goalie={this.goalie} />
      </table>
    )
  }
}
