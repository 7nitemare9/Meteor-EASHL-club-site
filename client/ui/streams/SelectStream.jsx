import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SelectStream extends TrackerReact(Component) {

  changeStream(name) {
    Session.set('active_stream', name);
  }

  isActive(name) {
    if (name == Session.get('active_stream')) {
      return "active"
    }
    return "inactive"
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
      <div className="streams-holder">
        {this.props.streams.map((data) => {
          return (
            <div
              className={`stream-selector-${this.isActive(data.name)}`}
              style={{width: `${100 / this.props.streams.length}%`}}
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
