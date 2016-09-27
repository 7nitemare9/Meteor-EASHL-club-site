import React, { Component } from 'react';

export default class Skaters extends Component {

  twoDec(num) {
    return Math.round(num * 100) / 100;
  }

  arrayfy(obj) {
    let returnArray = [];
    for (x in obj) {
      returnArray.push(obj[x]);
    }
    return returnArray;
  }

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
          {this.arrayfy(this.props.skaters).map(player => {
            let divide = this.props.full ? 1 : player.skgp;
            return (
              <tr>
                <td>{player.personaName}</td>
                <td>{player.skgp / divide}</td>
                <td>{this.twoDec((player.skgoals + player.skassists) / divide)}</td>
                <td>{this.twoDec(player.skgoals / divide)}</td>
                <td>{this.twoDec(player.skassists / divide)}</td>
                <td>{this.twoDec(player.skpim / divide)}</td>
                <td>{this.twoDec(player.skplusmin / divide)}</td>
                <td>{this.twoDec(player.skhits / divide)}</td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}
