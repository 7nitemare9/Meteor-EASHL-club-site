import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectStream from './SelectStream.jsx';
import ShowStream from './ShowStream.jsx';
import Box from '../commonCSS/box.js';

export default class Streaming extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {subscription: {
      streams: Meteor.subscribe('allStreams')
    }}
    Session.set('active_stream', 'none');
    this.style = {
      box: Object.assign({}, Box.box, {
        width: '310px',
        margin: '10px 0',
        display: 'flex',
        flexFlow: 'column'
      }),
      showStream: {
        display: 'flex',
        justifyContent: 'center'
      }
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
        <div style={this.style.box}>
          <div style={Box.header}>
            <img src="/assets/livestream.png" alt=""/>
          </div>
          <SelectStream streams={this.getStreams()} />
          <div style={this.style.showStream}>
            <ShowStream streams={this.getStreams()} />
          </div>
        </div>
      // </div>
    )
  }
}
