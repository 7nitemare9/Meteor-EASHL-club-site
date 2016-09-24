import React, { Component } from 'react';

export default class Skaters extends Component {

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>Name</td>
            <td>Games</td>
            <td>Points</td>
            <td>Goals</td>
            <td>Assists</td>
            <td>PIMS</td>
            <td>+/-</td>
            <td>Hits</td>
          </tr>
          {this.props.skaters.map(player => {
            return (
              <tr>
                <td>{player.personaName}</td>
                <td>{player.skgp}</td>
                <td>{player.skgoals + player.skassists}</td>
                <td>{player.skgoals}</td>
                <td>{player.skassists}</td>
                <td>{player.skpim}</td>
                <td>{player.skplusmin}</td>
                <td>{player.skhits}</td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}
