import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SkaterStats from './SkaterStats.jsx';
import GoalieStats from './GoalieStats.jsx';

export default class ShowPlayer extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {subscription:
      {players: Meteor.subscribe('allPlayers')}};
  }

  componentWillUnmount() {
    this.state.subscription.players.stop();
  }

  getPlayer(name) {
    return Players.findOne({name: name});
  }

  render() {
    if (!this.state.subscription.players.ready()) {
      return (
        <div>Loading...</div>
      )
    }
    let player = this.getPlayer(this.props.player);
    const skaterStats = (player.gamesplayed - player.glgp > 0) ? <SkaterStats player={player} /> : <div></div>
    const goalieStats = (player.glgp > 0) ? <GoalieStats player={player} /> : <div></div>
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="content">
            <div style={{backgroundImage: `url(/assets/players/${player.name}-p-info.png)`, backgroundRepeat: "no-repeat", display: "flex", backgroundSize: "100%", height: "275px"}}>
              <div className="playerinfo">
                <div className="playerinfo_text">
                  <p2>Gamertag:</p2>
                  <p>{player.name}</p>
                  <p2>Origin:</p2>
                  <p>{player.City}</p>
                  <p2>Age</p2>
                  <p>{player.age}</p>
                </div>
                <div className="strength">
                  <p2>Strengths:</p2>
                  <p>{player.strength}</p>
                </div>
                <div className="style">
                  <p2>Style:</p2>
                  <p>{player.style}</p>
                </div>
              </div>
              <div className="playercard">
                <img src={`/assets/players/spelarkort-${player.name}-l.png`} alt=""/>
              </div>
            </div>
            <div className="titlecard">Club Stats</div>
            {skaterStats}
            {goalieStats}
          </div>
        </div>
      </div>
    )
  }
}
