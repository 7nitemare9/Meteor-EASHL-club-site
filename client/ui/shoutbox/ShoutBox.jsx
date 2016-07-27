import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ShoutList from './ShoutList.jsx';

export default class ShoutBox extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {subscription: {
      shouts: Meteor.subscribe('allShouts')
    }}
  }

  addShout(event) {
    event.preventDefault();
    message = this.refs.message.value.trim();
    name = this.refs.name.value.trim();
    if (message && name) {
      Meteor.call('addShout', message, name);
      this.refs.message.value = "";
    }
  }

  getShouts() {
    return Shouts.find().fetch();
  }

  userName() {
    if (Meteor.user()) {
      return Meteor.user().profile.gamertag || Meteor.user().profile.name;
    }
  }

  render() {
    return (
      <div className="col-lg-3 col-md-4 b_column col-sm-6 col-xs-12">
        <div className="shouts">
          <div className="b_box">
            <div className="b_header">
              <img src="/assets/shout.png" alt=""/>
            </div>
            <ShoutList shouts={this.getShouts()} />
            <form onSubmit={this.addShout.bind(this)}>
              <input type="hidden"/>
              <textarea className="shout-text" ref="message" cols="30" rows="10"></textarea>
              <p className="shout-name-tag">Name:</p>
              <input type="text" id="shout_name" ref="name" value={this.userName()}/>
              <input type="submit" value="Send"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
