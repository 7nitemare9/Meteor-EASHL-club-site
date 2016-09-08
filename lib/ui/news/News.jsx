import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Splash from './Splash.jsx';
import Tray from './Tray.jsx';
import OldNews from './OldNews.jsx';
import * as NewsHelper from '../helpers/NewsHelper.js';

export default class News extends TrackerReact(Component) {
    constructor() {
        super();
        this.secondsToWait = 5;
        Session.set('counter', 0);
        console.log(Session.get('counter'));
        if (Meteor.isClient) {
          Session.set('timer', Meteor.setInterval(this.changeImage.bind(this), this.secondsToWait * 1000));
        }
        // Session.set('timer', timer);
        this.state = {
            subscription: {
                newsPosts: Meteor.subscribe('frontPageNews')
            }
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('news will unmount');
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



    pause() {
        Meteor.clearInterval(Session.get('timer'));
    }

    continue() {
        Session.set('timer', Meteor.setInterval(this.changeImage.bind(this), this.secondsToWait * 1000));
    }

    newsData() {
        // return NewsPosts.find().fetch().reverse();
        return NewsPosts.find({}, {sort: {created_at: -1}, limit: 11}).fetch();
    }

    render() {
        if(!this.state.subscription.newsPosts.ready()) {
            return (
                <div>Loading...</div>
            )
        }
        // Session.set('image', this.getImage(this.newsData()[Session.get('counter')]));
        this.newsData().forEach((data) => {
        })
        return (
                 <div key={'news-page'} className="reset-box b_box" >
                  <div className="b_box">
                    <div className="news">
                      <div className="post_image">
                        <div onMouseEnter={this.pause.bind(this)} onMouseLeave={this.continue.bind(this)}>
                          <Splash newsData={NewsHelper.getImage(this.newsData()[Session.get('counter')])}  />
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
