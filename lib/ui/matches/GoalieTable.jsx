import React, { Component } from 'react';

export default class GoalieTable extends Component {

  render() {
    if (!this.props.goalie) {
      return <div></div>
    }
    return (
      <tfoot>
        <tr className="team_head">
          <th>GamerTag</th>
          <th className="cr">Position</th>
          <th className="cr">Goals Against</th>
          <th className="cr">Save %</th>
          <th className="cr">Saves</th>
          <th className="cr">Shots</th>
        </tr>
        <tr>
          <td>{this.props.goalie.personaName}</td>
          <td className="cr">G</td>
          <td className="cr">{this.props.goalie.glga}</td>
          <td className="cr">{this.props.goalie.glsavepct}</td>
          <td className="cr">{this.props.goalie.glsaves}</td>
          <td className="cr">{this.props.goalie.glshots}</td>
        </tr>
      </tfoot>
    )
  }
}
