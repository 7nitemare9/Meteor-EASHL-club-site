import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectStream from './SelectStream.jsx';
import ShowStream from './ShowStream.jsx';

export default class Streaming extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {subscription: {
      streams: Meteor.subscribe('allStreams')
    }}
    Session.set('active_stream', 'none');
    this.style = {
      width: '310px',
      margin: '10px 0'
    }
  }

  getStreams() {
    return (Streams.find().fetch());
  }

  render() {
    if(!this.state.subscription.streams.ready()) {
        return (
            <div>Loading...</div>
        )
    }
    return (
      // <div className="col-lg-3 col-md-4 col-lg-pull-6 b_column col-sm-6 col-xs-6">
        <div className="b_box" style={this.style}>
          <div className="b_header">
            <img src="/assets/livestream.png" alt=""/>
          </div>
          <SelectStream streams={this.getStreams()} />
          <div className="b_stream">
            <ShowStream streams={this.getStreams()} />
            {/*<img src="/assets/TwitchBG.png" width="288" height="162" alt=""/>*/}
          </div>
        </div>
      // </div>
    )
  }
}
