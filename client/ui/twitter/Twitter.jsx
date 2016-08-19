import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Tweet from './Tweet.jsx';

export default class Twitter extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {subscription: {
      tweets: Meteor.subscribe('tweets')
    }};
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
      <div className="col-lg-3 col-md-4 b_column col-sm-6 col-xs-6">
        <div className="b_box" style={{minHeight: '295px'}}>
          <div className="b_header">
            <img src="/assets/twitter.png" alt=""/>
          </div>
          <table>
            <tbody>
              {this.getTweets().map((data) => {
                return (<Tweet key={data.id} tweet={data} />)
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
