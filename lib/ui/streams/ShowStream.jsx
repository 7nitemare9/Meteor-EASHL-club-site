import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ShowStream extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {client: false};
  }

  componentDidMount() {
    this.setState({client: true});
  }

  render() {
    if (this.props.streams.length == 0 || !this.state.client) {
      return (
        <img src="/assets/TwitchBG.png" width="304" height="172" alt=""/>
      )
    }
    return (
      <iframe
      id="twitch"
      src={`http://player.twitch.tv/?channel=${Session.get('active_stream')}&muted=true`}
      frameBorder="0"
      allowfullscreen="true"
      scrolling="no"
      height="188"
      width="304"
      >
      </iframe>
    )
  }
}
