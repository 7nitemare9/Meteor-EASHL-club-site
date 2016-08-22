import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SmallNewsBox from './SmallNewsBox.jsx';
import PrevNext from './PrevNext.jsx';

export default class NewsArchive extends TrackerReact(Component) {

  getNews() {
    return NewsPosts.find({}, {sort: {created_at: 1}, limit: 9}).fetch().reverse();
  }

  render() {
    this.state = {subscription: {news: Meteor.subscribe('tenNews', this.props.page * 10)}};
    if (!this.state.subscription.news.ready()) {
      return (<div>Loading...</div>);
    }
    console.log(this.getNews());
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>Archive</p2>
              </p>
              {this.getNews().map(news => {
                return (
                  <SmallNewsBox news={news} />
                )
              })}
              <PrevNext page={this.props.page} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
