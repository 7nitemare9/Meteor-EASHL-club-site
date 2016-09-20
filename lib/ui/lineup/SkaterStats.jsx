import React, { Component } from 'react';

export default class SkaterStats extends Component {

  render() {
    let player = this.props.player;
    return (
      <table>
        <thead>
          <tr className="team_head">
            <th className="cr">Games played</th>
            <th className="cr">Points</th>
            <th className="cr">Goals</th>
            <th className="cr">Assists</th>
            <th className="cr">Shots</th>
            <th className="cr">PIM</th>
            <th className="cr">Hits</th>
            <th className="cr">+/-</th>
            <th className="cr">PP Goals</th>
            <th className="cr">SH Goals</th>
            <th className="cr">Blocked shots</th>
            <th className="cr">Shot %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="cr">{player.gamesplayed - player.glgp}</td>
            <td className="cr">{player.skpoints}</td>
            <td className="cr">{player.skgoals}</td>
            <td className="cr">{player.skassists}</td>
            <td className="cr">{player.skshots}</td>
            <td className="cr">{player.skpim}</td>
            <td className="cr">{player.skhits}</td>
            <td className="cr">{player.skplusmin}</td>
            <td className="cr">{player.skppg}</td>
            <td className="cr">{player.skshg}</td>
            <td className="cr">{player.skbs}</td>
            <td className="cr">{player.skshotpct}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
