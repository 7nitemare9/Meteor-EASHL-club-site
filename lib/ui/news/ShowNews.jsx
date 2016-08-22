import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import * as Youtube from '../helpers/Youtube.js';
import * as NewsHelper from '../helpers/NewsHelper.js';
import SmallNewsBox from './SmallNewsBox.jsx';

export default class ShowNews extends TrackerReact(Component) {


  newsPost() {
    return NewsPosts.findOne(this.props.id);
  }

  prevPost() {
    return NewsPosts.findOne({created_at: {$lt: this.newsPost().created_at}});
  }

  nextPost() {
    return NewsPosts.findOne({created_at: {$gt: this.newsPost().created_at}});
  }

  createHtml(data) {
    return ({__html: data});
  }

  componentWillUnmount() {
    console.log('show nows will unmount');
    $('head').remove(this.newsPost().facebook);
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

  onComplete(err, val) {
    console.log('deleted news', err, val);
    if (err) {
      Bert.Alert(err, 'warning', 'fa-frown');
    }
    Bert.alert('News-post deleted', 'success', 'fa-check');
    FlowRouter.go('/');
  }

  deleteNews() {
    Meteor.call('deleteNews', this.props.id, this.onComplete);
  }

  render() {
    this.state = {
        subscription: {
            currentPost: Meteor.subscribe('current', this.props.id)
        }
    }
    this.state.subscription.previousPost = Meteor.subscribe('previous', this.props.id);
    this.state.subscription.nextPost = Meteor.subscribe('next', this.props.id);
    if(!this.state.subscription.currentPost.ready()) {
        return (
            <div>Loading...</div>
        )
    }
    DocHead.addMeta({property: 'og:title', content: this.newsPost().title});
    DocHead.addMeta({property: 'og:image', content: NewsHelper.getImage(this.newsPost())});
    DocHead.addMeta({property: 'fb:app_id', content: '989352457849190'});
    DocHead.addMeta({property: 'og:url', content: `http://bombers-hockey.com/news/${this.newsPost()._id}`});
    let edit = Roles.userIsInRole(Meteor.user(), ['Admin', 'News-poster'])
    ? <div><a href={`/admin/newsedit/${this.props.id}`}>Edit</a>
      <a href="#" onClick={this.deleteNews.bind(this)}>Delete</a></div>
    : <br/>;
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
                      <div dangerouslySetInnerHTML={this.createHtml(this.newsPost().text)} >
                      </div>
                    </p3>
                    {edit}
                    <SmallNewsBox news={this.nextPost()} class="arrow-left" />
                    <SmallNewsBox news={this.prevPost()} style={{float: "right"}} class="arrow-right"/>
                  </div>
                </div>
            </div>
    )
  }
}
