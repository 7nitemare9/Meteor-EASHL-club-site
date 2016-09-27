import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Skaters extends TrackerReact(Component) {

  twoDec(num) {
    return Math.round(num * 100) / 100;
  }

  sortBy(key) {
    this.props.skaters.sort((a, b) => {
      let aDivide = this.props.full ? 1 : a.skgp;
      let bDivide = this.props.full ? 1 : b.skgp;
      if (key === 'points') {
        if ((a.skgoals + a.skassists) / aDivide <= (b.skgoals + b.skassists) / bDivide) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a[key] <= b[key]) {
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
          <tr>
            <td>Name</td>
            <td onClick={() => this.sortBy('skgp')}>Games</td>
            <td onClick={() => this.sortBy('points')}>Points</td>
            <td onClick={() => this.sortBy('skgoals')}>Goals</td>
            <td onClick={() => this.sortBy('skassists')}>Assists</td>
            <td onClick={() => this.sortBy('skpim')}>PIMS</td>
            <td onClick={() => this.sortBy('skplusmin')}>+/-</td>
            <td onClick={() => this.sortBy('skhits')}>Hits</td>
          </tr>
          {this.props.skaters.map(player => {
            let divide = this.props.full ? 1 : player.skgp;
            return (
              <tr>
                <td>{player.personaName}</td>
                <td>{player.skgp / divide}</td>
                <td>{this.twoDec((parseInt(player.skgoals) + parseInt(player.skassists)) / divide)}</td>
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
