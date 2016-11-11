import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Session } from '../../../server/lib/session.js';

export default class TopNews extends TrackerReact(Component) {
   render() {
     if (Meteor.isServer) {
       console.log(Session);
       Session.set('counter', 0);
       console.log(Session.get('counter'));
     }
      const news = this.props.newsData[Session.get('counter')];
      return (
          <ReactCSSTransitionGroup
              transitionName="title-spinner"
              transitionEnterTimeout={1200}
              transitionLeaveTimeout={500}
          >
             <div key={news ? news.title : ''} id="top_news">
                <div className="title">
                   <a href={news ? `/news/${news._id}` : '#'} >
                       {news ? news.title.toUpperCase() : ''}
                   </a>
                </div>
             </div>
          </ReactCSSTransitionGroup>
      )
   }
}
