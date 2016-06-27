import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import * as Youtube from '../helpers/Youtube.js';

export default class ShowNews extends TrackerReact(Component) {
  constructor() {
      super();
      this.state = {
          subscription: {
              newsPosts: Meteor.subscribe('allNews')
          }
      }
  }

  componentWillUnmount() {
      this.state.subscription.newsPosts.stop();
  }

  newsPost() {
    return NewsPosts.findOne(this.props.id);
  }

  createHtml(data) {
    return ({__html: data});
  }

  imageOrYoutube() {
    if (this.newsPost().image.length > 0) {
      return <img src={this.newsPost().image} />
    } else if (this.newsPost().youtube.length > 0) {
      console.log(Youtube.embedYoutube(this.newsPost().youtube));
      return <iframe width="560" height="315" src={Youtube.embedYoutube(this.newsPost().youtube)} frameborder="0" allowfullsrceen></iframe>
    }
    return <div></div>
  }

  render() {
    if(!this.state.subscription.newsPosts.ready()) {
        return (
            <div>Loading...</div>
        )
    }
    return (<div className="b_box" >
                <div className="b_box" >
                  <div className="content">
                    <p>
                      <img src="/assets/blank.jpg" />
                      <p2>{this.newsPost().title}</p2>
                    </p>
                    <p3>
                      {this.imageOrYoutube()}
                      <br />
                      <div dangerouslySetInnerHTML={this.createHtml(this.newsPost().text)} ></div>
                    </p3>
                  </div>
                </div>
            </div>
    )
  }
}
