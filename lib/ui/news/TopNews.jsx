import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Colors from '../commonCSS/colors.js';

export default class TopNews extends TrackerReact(Component) {
  constructor() {
    super();
    this.darkestGreyRGB = Colors.hexToRgb(Colors.darkestGrey);
    this.secondaryRGB = Colors.hexToRgb(Colors.secondary);
    this.style = {
      topNews: {
        height: '100px',
        overflow: 'hidden',
        textAlign: 'center',
        background: `rgba(${this.darkestGreyRGB.r}, ${this.darkestGreyRGB.g}, ${this.darkestGreyRGB.b}, 0.9)`,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 0 3px rgba(0,0,0,0.23)'
      },
      title: {
        marginTop: '40px',
        width: '636px'
      },
      link: {
        fontFamily: 'Myriad',
        fontWeight: 'bold',
        fontSize: '20px',
        textDecoration: 'none',
        color: `rgba(${this.secondaryRGB.r}, ${this.secondaryRGB.g}, ${this.secondaryRGB.b}, 0.9)`
      }
    }
  }

   render() {
      const newsItem = this.props.newsData[this.props.counter];
      return (
          <ReactCSSTransitionGroup
              transitionName="title-spinner"
              transitionEnterTimeout={1200}
              transitionLeaveTimeout={500}
          >
             <div key={newsItem ? newsItem.title : Math.random()} style={this.style.topNews} >
                <div style={this.style.title}>
                   <a style={this.style.link} href={`/news/${newsItem ? newsItem._id : Math.random()}`} >
                       {newsItem ? newsItem.title.toUpperCase() : ''}
                   </a>
                </div>
             </div>
          </ReactCSSTransitionGroup>
      )
   }
}
