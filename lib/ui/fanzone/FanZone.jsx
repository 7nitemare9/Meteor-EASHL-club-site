import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MediaImage from './MediaImage.jsx';

export default class FanZone extends TrackerReact(Component) {
  constructor () {
    super();
    this.state = {subscription:
      {media: Meteor.subscribe('allOfFanZone')}};
  }

  getMedia() {
    return Media.find().fetch();
  }

  render() {
    if (!this.state.subscription.media.ready()) {
      return (<div>Loading...</div>)
    }
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
              </p>
              <ul className="row">
                {this.getMedia().map((data) => {
                  return (<MediaImage key={data._id} media={data}/>);
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
