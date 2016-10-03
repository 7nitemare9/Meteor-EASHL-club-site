import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LatestInForum extends TrackerReact(Component) {

  getLatestThreads() {
    return ForumThreads.find({}, {sort: {updatedAt: -1}, limit: 5}).fetch();
  }

  render() {
    this.state = {subscription: {threads: Meteor.subscribe('latestThreads')}}
    if (!this.state.subscription.threads.ready()) {
      return (<div>Loading...</div>);
    }
    let empty = [1, 2, 3, 4, 5];
    empty = empty.slice(0, 5 - this.getLatestThreads().length);
    return (
      <div className="col-lg-3 b_column col-md-4 col-sm-6 col-xs-6">
        <div className="b_box latest-forum">
          <div className="b_header">
            <img src="/assets/forumposts.png" />
          </div>
          {this.getLatestThreads().map(thread => {
            return (
              <li key={thread._id} className="list-group-item">
                <a href={`/forum/thread/${thread._id}`}>
                  <p>{thread.title}</p>
                </a>
              </li>
            )
          })}
          {empty.map(x =>  {
            return (
              <li key={x} className="list-group-item">
                <a href="#">
                  <p></p>
                </a>
              </li>
            )
          })}
        </div>
      </div>
    )
  }

}
