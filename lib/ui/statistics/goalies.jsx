import React, { Component } from 'react';

export default class Goalies extends Component {

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
            return (
              <tr>
                <td>{player.personaName}</td>
                <td>{player.glgp}</td>
                <td>{player.glsaves}</td>
                <td>{player.glshots}</td>
                <td>{(player.glsaves / player.glshots) * 100}%</td>
                <td>{player.glga / player.glgp}</td>
                <td>{player.glso}</td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}
