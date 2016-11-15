import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Box from '../commonCSS/box.js';
import Colors from '../commonCSS/colors.js';

export default class LatestInForum extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {isClient: false};
    this.style = {
      box: {
        ...Box.box,
        width: '310px',
        margin: '10px 0'
      },
      ul: {
        margin: '0px'
      },
      li: {
        even: {
          height: '22px',
          padding: '2px 15px 0px 15px',
          background: Colors.grey,
          border: 'none',
          minWidth: '200px',
          display: 'flex',
          justifyContent: 'space-between'
        },
        odd: {
          height: '22px',
          padding: '2px 15px 0px 15px',
          background: Colors.darkGrey,
          border: 'none',
          minWidth: '200px',
          display: 'flex',
          justifyContent: 'space-between'
        }
      }
    }
  }

  getLatestThreads() {
    if (this.state.isClient) {
      return ForumThreads.find({}, {sort: {updatedAt: 1}, limit: 5}).fetch();
    }
    return [];
  }

  componentDidMount() {
    this.setState({isClient: true});
  }

  render() {
    this.state.subscription = {threads: Meteor.subscribe('latestThreads')};
    if (!this.state.subscription.threads.ready()) {
      return (<div>Loading...</div>);
    }
    let empty = [1, 2, 3, 4, 5];
    empty = empty.slice(0, 5 - this.getLatestThreads().length);
    return (
      // <div className="col-lg-3 b_column col-md-4 col-sm-6 col-xs-6">
        <div style={this.style.box} >
          <div className="b_header">
            <img src="/assets/forumposts.png" />
          </div>
          <ul style={this.style.ul}>
            {this.getLatestThreads().map((thread, idx) => {
              return (
                <li key={thread._id} style={idx % 2 == 0 ? this.style.li.even : this.style.li.odd}>
                  <a href={`/forum/thread/${thread._id}`}>
                    <p>{thread.title}</p>
                  </a>
                </li>
              )
            })}
            {empty.map((x, idx) =>  {
              return (
                <li key={x} style={idx % 2 == 0 ? this.style.li.even : this.style.li.odd}>
                  <a href="#">
                    <p></p>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      // </div>
    )
  }

}
