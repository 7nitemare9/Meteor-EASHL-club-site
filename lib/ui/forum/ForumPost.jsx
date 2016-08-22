import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ForumPost extends TrackerReact(Component) {

  componentDidUpdate() {
    this.setQuoteClass();
  }

  setQuoteClass() {
    let selector = '.quote';
    let count = 0;
    while(true) {
    if ($(selector).length > 0) {
      if (count % 2 == 1) {
        let elements = $(selector);
        elements.each(function() {
          $(this).addClass('quote-odd');
        });
      } else {
        let elements = $(selector);
        elements.each(function() {
          $(this).removeClass('quote-odd');
        });
      }
      count++;
      selector = selector.concat(' .quote');
    } else {
      break;
    }
    }
  }

  setHtml(message) {
    let quoteString = message.substring(message.indexOf('uid:'), message.indexOf(':uid') +4);
    let user = "";
    if (quoteString.length > 5) {
      let id = quoteString.substring(4, quoteString.indexOf(':uid'));
      user = Meteor.users.findOne({_id: id}).profile.gamertag || Meteor.users.findOne({_id: id}).profile.name;
      message = message.replace(quoteString, user);
    }
    return ({__html: message});
  }

   getUser(userId) {
     return Meteor.users.findOne({_id: userId}).profile.gamertag || Meteor.users.findOne({_id: userId}).profile.name;
   }

  quote() {
    let quote = `q:"${this.refs.message.innerHTML}":quid:${this.refs.userId.value}:uid`;
    $('#edit').froalaEditor('html.insert', quote, true);

  }

  onComplete(err, val) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    } else if (this.props.thread) {
      Bert.alert('thread deleted', 'success', 'fa-check');
      FlowRouter.go(`/forum/${val}`)
    } else {
      Bert.alert('post deleted', 'success', 'fa-check');
      FlowRouter.go(`/forum/thread/${val}`);
    }
  }

  deletePost() {
    if (this.props.thread) {
      Meteor.call('deleteForumThread', this.props.post._id, this.onComplete.bind(this));
    } else {
      Meteor.call('deleteForumPost', this.props.post._id, this.onComplete.bind(this));
    }
  }

  editLinks(currentUser, creator) {
    if (!currentUser) {
      return (<div></div>);
    }
    if (currentUser._id === creator || Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      let editLink = this.props.post.category ?
          <a href={`/forum/editthread/${this.props.post._id}`}>edit </a> :
          <a href={`/forum/editpost/${this.props.post._id}`}>edit </a>
      return (
        <div>
          {editLink}
          <a href="#" onClick={this.deletePost.bind(this)}> delete</a>
        </div>
      )
    }
  }

  render() {
    this.state = {
        subscription: {
            users: Meteor.subscribe('allUserProfiles')
        }
    };
    if (!this.state.subscription.users.ready()) {
      return (<div>Loading...</div>);
    }
    let post = this.props.post;
    return (
      <div className="post-container">
        <div className="post-data">
          <div className="user-name" ref="userId" value={post.userId}>{this.getUser(post.userId)}</div>
          <div className="created-at">{moment(post.createdAt).format('YY-MM-DD  HH:mm')}</div>
        </div>
        <div ref='message' className="post-message"
          dangerouslySetInnerHTML={this.setHtml(post.message)}>
        </div>
        <a href="#" onClick={this.quote.bind(this)}>quote</a>
        {this.editLinks(Meteor.user(), post.userId)}
     </div>
    )
  }
}
