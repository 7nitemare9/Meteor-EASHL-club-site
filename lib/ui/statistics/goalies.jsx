import React, { Component } from 'react';

export default class Goalies extends Component {

  twoDec(num) {
    return Math.round(num * 100) / 100;
  }

  sortBy(key) {
    this.props.goalies.sort((a, b) => {
      let aDivide = this.props.full ? 1 : a.skgp;
      let bDivide = this.props.full ? 1 : b.skgp;
      if (key === 'glsvpct') {
        if ((a.glsaves / a.glshots) <= (b.glsaves / b.glshots)) {
          return 1;
        } else {
          return -1;
        }
      }
      if (key === 'glgaa') {
        if ((a.glga / a.glgp) <= (b.glga / a.glgp)) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a[key] / aDivide <= b[key] / bDivide) {
        return 1;
      } else {
        return -1;
      }
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td onClick={() => this.sortBy('glgp')}>Games</td>
              <td onClick={() => this.sortBy('glsaves')}>Saves</td>
              <td onClick={() => this.sortBy('glshots')}>Shots</td>
              <td onClick={() => this.sortBy('glsvpct')}>Save %</td>
              <td onClick={() => this.sortBy('glgaa')}>GAA</td>
              <td onClick={() => this.sortBy('glso')}>Shutouts</td>
            </tr>
            {this.props.goalies.map(player => {
              let divide = this.props.full ? 1 : player.glgp;
              return (
                <tr key={player.personaName + player.glgp}>
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
          </tbody>
        </table>
      </div>
    )
  }
}
