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
        this.state = {counter: 0};
        if (Meteor.isClient) {
          this.state.timer = Meteor.setInterval(this.changeImage.bind(this), this.secondsToWait * 1000);
        }
        this.state.subscription = {
          newsPosts: Meteor.subscribe('frontPageNews')
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
        if (this.state.counter < 4) {
          this.setState({counter: this.state.counter + 1});
        } else {
          this.setState({counter: 0});
        }
    }



    pause() {
        Meteor.clearInterval(this.state.timer);
    }

    continue() {
        this.setState({timer: Meteor.setInterval(this.changeImage.bind(this), this.secondsToWait * 1000)});
    }

    newsData() {
        return NewsPosts.find({}, {sort: {created_at: -1}, limit: 11}).fetch();
    }

    setCounter(num) {
      this.setState({counter: num});
    }

    render() {
        if(!this.state.subscription.newsPosts.ready()) {
            return (
                <div>Loading...</div>
            )
        }
        this.newsData().forEach((data) => {
        })
        return (
                 <div key={'news-page'} className="reset-box b_box" >
                  <div className="b_box">
                    <div className="news">
                      <div className="post_image">
                        <div onMouseEnter={this.pause.bind(this)} onMouseLeave={this.continue.bind(this)}>
                          <Splash newsData={NewsHelper.getImage(this.newsData()[this.state.counter])}  />
                          <Tray newsData={this.newsData()} counter={this.state.counter} setCounter={this.setCounter.bind(this)}/>
                        </div>
                      </div>
                    </div>
                   </div>
                  <OldNews newsData={this.newsData()} />
                 </div>
        )
    }
}
