import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { ReactiveDict } from 'meteor/reactive-dict';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Splash extends TrackerReact(Component) {
  constructor() {
    super();
    this.style = {
      slider: {
        height: '365px',
        display: 'flex',
        transition: 'none',
        marginLeft: '0px'
      },
      image: {
        height: '365px',
        width: '636px',
        maxWidth: '100%'
      }
    }
  }

    render() {
        return (
          <div style={this.style.slider}>
            <ReactCSSTransitionGroup
              transitionName="image-flip"
              transitionLeaveTimeout={1000}
              transitionEnterTimeout={1000}
            >
              <img style={this.style.image} key={this.props.newsData} src={this.props.newsData} />
                </ReactCSSTransitionGroup>
          </div>
        )
    }
}
