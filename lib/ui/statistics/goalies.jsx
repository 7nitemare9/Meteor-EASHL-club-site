import React, { Component } from 'react';

export default class Goalies extends Component {

  twoDec(num) {
    return Math.round(num * 100) / 100;
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <td>Name</td>
            <td>Games</td>
            <td>Saves</td>
            <td>Shots</td>
            <td>Save %</td>
            <td>GAA</td>
            <td>Shutouts</td>
          </tr>
          {this.props.goalies.map(player => {
            let divide = this.props.full ? 1 : player.glgp;
            return (
              <tr>
                <td>{player.personaName}</td>
                <td>{player.glgp / divide}</td>
                <td>{this.twoDec(player.glsaves / divide)}</td>
                <td>{this.twoDec(player.glshots / divide)}</td>
                <td>{this.twoDec((player.glsaves / player.glshots) * 100)}%</td>
                <td>{this.twoDec(player.glga / player.glgp)}</td>
                <td>{this.twoDec(player.glso / divide)}</td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}
