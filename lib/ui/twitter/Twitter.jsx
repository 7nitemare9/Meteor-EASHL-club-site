import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Tweet from './Tweet.jsx';
import Box from '../commonCSS/box.js';
import Colors from '../commonCSS/colors.js';

export default class Twitter extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {subscription: {
      tweets: Meteor.subscribe('tweets')
    }};
    this.style = {
      box: Object.assign(Box.box, {
        width: '310px',
        margin: '10px 0'
      }),
      ul: {
        margin: '0px'
      },
      li: {
        even: {
          background: Colors.grey,
          border: 'none',
          minWidth: '200px',
          display: 'flex',
          justifyContent: 'space-between'
        },
        odd: {
          background: Colors.darkGrey,
          border: 'none',
          minWidth: '200px',
          display: 'flex',
          justifyContent: 'space-between'
        }
      }
    }
  }

  getTweets() {
    return Tweets.find({}, {sort: {created_at: -1}}).fetch();
  }

  render() {
    if(!this.state.subscription.tweets.ready()) {
        return (
            <div>Loading...</div>
        )
    }
    return (
      // <div className="col-lg-3 col-md-4 b_column col-sm-6 col-xs-6">
        <div style={this.style.box}>
          <div className="b_header">
            <img src="/assets/twitter.png" alt=""/>
          </div>
            <ul style={this.style.ul}>
              {this.getTweets().map((data, idx) => {
                return (<Tweet key={data.id} tweet={data} style={idx % 2 == 0 ? this.style.li.even : this.style.li.odd}/>)
              })}
            </ul>
        </div>
      // </div>
    )
  }
}
