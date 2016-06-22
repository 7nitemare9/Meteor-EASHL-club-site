import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ShowStream extends TrackerReact(Component) {

  render() {
    if (this.props.streams.length == 0) {
      return (
        <img src="/assets/TwitchBG.png" width="288" height="162" alt=""/>
      )
    }
    return (
      <iframe
        frameBorder="0"
        id="twitch"
        src={`http://player.twitch.tv/?channel=${Session.get('active_stream')}&html5`}
        autoplay="true"
        channel={Session.get('active_stream')}
        allowfullscreen
        height="188"
        width="288"
      >
      </iframe>
    )
  }
}
