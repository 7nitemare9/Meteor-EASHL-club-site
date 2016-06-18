import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { ReactiveDict } from 'meteor/reactive-dict';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Splash extends TrackerReact(Component) {
    
    render() {
        return (
            
                <div id="slider" >
            <ReactCSSTransitionGroup
        transitionName="image-flip"
        transitionLeaveTimeout={1000}
        transitionEnterTimeout={1000}
                
        >
                
                   <img key={this.props.newsData} src={this.props.newsData} />
                </ReactCSSTransitionGroup>
                
                </div>
        )
    }
}