import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Splash from './Splash.jsx';
import Tray from './Tray.jsx';
import OldNews from './OldNews.jsx';

export default class News extends TrackerReact(Component) {
    constructor() {
        super();
        this.state = {
            subscription: {
                newsPosts: Meteor.subscribe('allNews')
            }
        }
        Session.set('counter', 0);
        Session.set('timer', Meteor.setInterval(this.changeImage.bind(this), 3000));
        this.test = [];
        // Session.set('timer', timer);
    }

    componentWillUnmount() {
        this.state.subscription.newsPosts.stop();
        Meteor.clearInterval(Session.get('timer'));
    }

    changeImage(){
        this.test = [];
        if (Session.get('counter') < 4) {
            Session.set('counter', Session.get('counter') + 1);
        } else {
            Session.set('counter', 0);
        }
    }

    youtubeToImage(image) {
        return (
            image.replace(
                image.substring(0,
                    image.indexOf('embed/') + 6),
                'http://img.youtube.com/vi/').concat('/0.jpg')
        )
    }

    getImage(data) {
        if (data) {
            if (data.image.length != 0) {
                return data.image[0];
            } else if (data.youtube.length != 0) {
                return this.youtubeToImage(data.youtube[0]);
            } else {
                return "test.jpg";
            }
        }
    }

    pause() {
        Meteor.clearInterval(Session.get('timer'));
    }

    continue() {
        Session.set('timer', Meteor.setInterval(this.changeImage.bind(this), 3000));
    }

    newsData() {
        return NewsPosts.find().fetch();
    }

    render() {
        if(!this.state.subscription.newsPosts.ready()) {
            return (
                <div>Loading...</div>
            )
        }
        // Session.set('image', this.getImage(this.newsData()[Session.get('counter')]));
        return (
                <div key={'news-page'} className="reset-box b_box" >
                  <div className="b_box">
                    <div className="news">
                      <div className="post_image">
                        <div onMouseEnter={this.pause.bind(this)} onMouseLeave={this.continue.bind(this)}>
                          <Splash newsData={this.getImage(this.newsData()[Session.get('counter')])}  />
                          <Tray newsData={this.newsData()} />
                        </div>
                      </div>
                    </div>
                  </div>
                    <OldNews newsData={this.newsData()} />
                </div>
        )
    }
}
