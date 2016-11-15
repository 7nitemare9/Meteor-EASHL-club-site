import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ShoutList from './ShoutList.jsx';
import Box from '../commonCSS/box.js';
import Colors from '../commonCSS/colors.js';

export default class ShoutBox extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {subscription: {
      shouts: Meteor.subscribe('allShouts')
    }}
    this.style = {
      box: Object.assign(Box.box, {
        width: '310px',
        margin: '10px 0'
      }),
      text: {
        width: '97%',
        height: '70px',
        border: '0'
      },
      nameTag: {
        color: Colors.secondary,
        width: '24%',
        display: 'inline',
        margin: '2%'
      }
    }
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
      <div style={this.style.box}>
        <div className="b_header">
          <img src="/assets/shout.png" alt=""/>
        </div>
        <ShoutList shouts={this.getShouts()} />
        <form onSubmit={this.addShout.bind(this)}>
          <input type="hidden"/>
          <textarea style={this.style.text} ref="message" cols="30" rows="10"></textarea>
          <p style={this.style.nameTag}>Name:</p>
          <input type="text" id="shout_name" ref="name" value={this.userName()}/>
          <input type="submit" value="Send"/>
        </form>
      </div>
    )
  }
}
