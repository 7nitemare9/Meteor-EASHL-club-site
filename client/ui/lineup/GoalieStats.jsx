import React, { Component } from 'react';

export default class GoalieStats extends Component {

  render() {
    let player = this.props.player;
    return (
      <table>
        <thead>
          <tr className="team_head">
            <th className="cr">Games played</th>
            <th className="cr">Goals against</th>
            <th className="cr">GAA</th>
            <th className="cr">Saves</th>
            <th className="cr">Save %</th>
            <th className="cr">Shut outs</th>
            <th className="cr">SO periods</th>
            <th className="cr">Wins</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="cr">{player.glgp}</td>
            <td className="cr">{player.glga}</td>
            <td className="cr">{player.glgaa}</td>
            <td className="cr">{player.glsaves}</td>
            <td className="cr">{player.glsavepct}</td>
            <td className="cr">{player.glso}</td>
            <td className="cr">{player.glsoperiods}</td>
            <td className="cr">{player.glwins}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
