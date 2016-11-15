import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TopNews from './TopNews.jsx';
import OtherNews from './OtherNews.jsx';

export default class Tray extends TrackerReact(Component) {

    render() {
        return (
           <div className="tray">
               <TopNews newsData={this.props.newsData} counter={this.props.counter}/>
               <OtherNews newsData={this.props.newsData} counter={this.props.counter} setCounter={this.props.setCounter}/>
           </div>
        )
    }
}
