import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Colors from '../commonCSS/colors.js';

export default class SelectStream extends TrackerReact(Component) {
  constructor() {
    super();
    this.style = {
      holder: {
        display: 'flex',
        justifyContent: 'space-around'
      }
    }
  }

  changeStream(name) {
    Session.set('active_stream', name);
  }

  isActive(name) {
    if (name == Session.get('active_stream')) {
      return {
        color: Colors.secondary,
        textAlign: 'center'
      }
    }
    return {
      color: Colors.secondaryDimmed,
      cursor: 'pointer',
      textAlign: 'center'
    }
  }

  render() {
    if (this.props.streams.length == 0) {
      this.changeStream('none');
      return (<div></div>);
    }
    if (Session.get('active_stream') == 'none') {
      this.changeStream(this.props.streams[0].name);
    }
    return (
      <div style={this.style.holder}>
        {this.props.streams.map((data) => {
          return (
            <div
              style={this.isActive(data.name)}
              // style={{width: `${100 / this.props.streams.length}%`}}
              onClick={() => {this.changeStream(data.name);}}
            >
              {data.name}
            </div>
          )
        })}
      </div>
    )
  }
}
