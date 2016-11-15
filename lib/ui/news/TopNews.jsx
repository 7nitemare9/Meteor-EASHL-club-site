import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TopNews extends TrackerReact(Component) {
   render() {
      const newsItem = this.props.newsData[this.props.counter];
      return (
          <ReactCSSTransitionGroup
              transitionName="title-spinner"
              transitionEnterTimeout={1200}
              transitionLeaveTimeout={500}
          >
             <div key={newsItem ? newsItem.title : Math.random()} id="top_news">
                <div className="title">
                   <a href={`/news/${newsItem ? newsItem._id : Math.random()}`} >
                       {newsItem ? newsItem.title.toUpperCase() : ''}
                   </a>
                </div>
             </div>
          </ReactCSSTransitionGroup>
      )
   }
}
