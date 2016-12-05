import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SmallNewsBox from './SmallNewsBox.jsx';
import PrevNext from './PrevNext.jsx';
import Box from '../commonCSS/box.js';

export default class NewsArchive extends TrackerReact(Component) {
  constructor() {
    super();
    this.style = {
      box: Box.box,
      title: {
        fontFamily: 'Lobster',
        color: 'rgba(235,195,0,0.85)',
        fontWeight: '600',
        padding: '2px 0',
        margin: '0 7px',
        textAlign: 'right',
        fontSize: '18px',
        width: '100%',
        borderBottom: '3px solid'
      },
      content: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      }
    }
  }

  getNews() {
    return NewsPosts.find({}, {sort: {created_at: 1}, limit: 9}).fetch().reverse();
  }

  render() {
    this.state = {subscription: {news: Meteor.subscribe('tenNews', this.props.page * 10)}};
    if (!this.state.subscription.news.ready()) {
      return (<div>Loading...</div>);
    }
    return (
      <div style={this.style.box}>
        <div style={this.style.content}>
          <p style={this.style.title}>News Archive</p>
          {this.getNews().map(news => {
            return (
              <SmallNewsBox key={news.id} news={news} />
            )
          })}
          <PrevNext page={this.props.page} />
        </div>
      </div>
    )
  }
}
