import React, { Component } from 'react';

export default class Forwards extends Component {

  render() {
    return (
      <div>
      {this.props.forwards.map((player) => {
        return (
          <div key={player._id} className="flip-container">
            <a href={`/lineup/${player.name}`}>
              <div className="flipper">
                <div className="front">
                  <img src={`/assets/players/${player.name}-s-front.png`} alt=""/>
                </div>
                <div className="back">
                  <img src={`/assets/players/${player.name}-s-back.png`} alt=""/>
                </div>
              </div>
            </a>
          </div>
        )
      })}
      </div>
    )
  }
}
