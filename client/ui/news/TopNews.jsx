import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TopNews extends TrackerReact(Component) {
   render() {
      return (
          <ReactCSSTransitionGroup
              transitionName="title-spinner"
              transitionEnterTimeout={1200}
              transitionLeaveTimeout={500}
          >
             <div key={this.props.newsData[Session.get('counter')].title} id="top_news">
                <div className="title">
                   <a href={`/news/${this.props.newsData[Session.get('counter')]._id}`} >
                       {this.props.newsData[Session.get('counter')].title.toUpperCase()}
                   </a>
                </div>
             </div>
          </ReactCSSTransitionGroup>
      )
   }
}
