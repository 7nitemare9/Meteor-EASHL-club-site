import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Forwards from './Forwards.jsx';
import Defenders from './Defenders.jsx';
import Goalkeepers from './Goalkeepers.jsx';
import { Players } from '../../../lib/collections.js';

export default class Lineup extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {subscription:
      {players: Meteor.subscribe('allPlayers')}};
  }

  componentWillUnmount() {
    this.state.subscription.players.stop();
  }

  getPlayers() {
    return Players.find().fetch();
  }

  getPlayerType(data, position, altPosition = "placeholder") {
    console.log(altPosition);
      return data.filter((player) => {
        if (player.position == position || player.position == altPosition) {
          console.log(player);
          return player;
        }
      });
  }

  render() {
    if (!this.state.subscription.players.ready()) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="content">
            <p>
              <img src="/assets/blank.jpg" alt=""/>
              <p2>LINEUP</p2>
            </p>
          </div>
          <div className="centering">
            <br/>
            <div className="titlecard">
              <img src="/assets/players/forwards.png" alt=""/>
            </div>
            <div className="card-container">
              <Forwards forwards={this.getPlayerType(this.getPlayers(), "Forward", "Center")}/>
            </div>
            <div className="titlecard">
              <img src="/assets/players/defenders.png" alt=""/>
            </div>
            <div className="card-container">
              <Defenders defenders={this.getPlayerType(this.getPlayers(), "Defense")}/>
            </div>
            <div className="titlecard">
              <img src="/assets/players/goalkeepers.png" alt=""/>
            </div>
            <div className="card-container">
              <Goalkeepers goalies={this.getPlayerType(this.getPlayers(), "Goaltender")}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
