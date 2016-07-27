import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ChatList extends TrackerReact(Component) {
  constructor () {
    super();
    this.sound = new buzz.sound('/assets/sound/preview.mp3', {volume: 100});
  }

  getUserName(userId) {
    if (!(Meteor.user()._id === userId)) {
      let user = Meteor.users.findOne({_id: userId});
      return user.profile.gamertag ? user.profile.gamertag : user.profile.name;
    }
  }

  getUserImage(userId) {
    if (!(Meteor.user()._id === userId)) {
      return Meteor.users.findOne({_id: userId}).profile.image || '/assets/no_profile_image.png';
    }
  }

  getClass(baseClass, userId) {
    if (Meteor.user()._id === userId) {
      return `${baseClass}-own`;
    }
    return baseClass;
  }

  editMessage(data) {
    $('#edit').froalaEditor('html.set', data.message, true);
    Session.set('editChat', data._id);
  }

  deleteMessage(id) {
    Meteor.call('deleteChatMessage', id);
  }

  getDateTime(date) {
    var now = new Date();
    var weekAgo = moment(now).subtract(7, 'days').startOf('day').valueOf();
    if (moment(date).startOf('day').valueOf() === moment(now).startOf('day').valueOf()) {
      return `today ${moment(date).format('HH:mm')}`;
    }
    if (moment(date).startOf('day').valueOf() === moment(now).subtract(1, 'day').startOf('day').valueOf()) {
      return `yesterday ${moment(date).format('HH:mm')}`;
    }
    if (moment(date).startOf('day').valueOf() >= weekAgo) {
      return `${moment(date).format('dddd HH:mm')}`;
    }
    return `${moment(date).format('YYYY-MM-DD HH:mm')}`;
  }

  createHTML(data) {
    return {__html: data}
  }

  componentDidUpdate() {
    $('.chat-container img').each(function(index, value) {
      $(value).on('click', () => {window.open(value.src)});
    });
    var chatList = document.getElementById('chat-list');
    chatList.scrollTop = chatList.scrollHeight + 200;
    Meteor.call('nullMissedMessages', Meteor.user());
  }

  componentWillReceiveProps() {
    this.sound.play();
  }

  render() {
    this.state = {subscription: {users: Meteor.subscribe('allUserProfiles')}}
    if (!this.state.subscription.users.ready()) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="chat-list" id="chat-list">
        {this.props.messages.map((data) => {
          let editDelete = Meteor.user()._id === data.user ?
            <div className="edit-delete">
              <div className="delete-chat" onClick={() => {this.deleteMessage(data._id)}}> delete</div>
              <div className="edit-chat" onClick={() => {this.editMessage(data)}}>edit </div>
            </div> :
            <div></div>;
          return (
            <div className="single-chat">
              <div className="chat-profile"><img src={this.getUserImage(data.user)} /></div>
              <div className="chat-container">
                <div className="chat-name">{this.getUserName(data.user)}</div>
                <div className={this.getClass('chat-time', data.user)}>{this.getDateTime(data.date)}</div>
                <div className={this.getClass('chat-message', data.user)} dangerouslySetInnerHTML={this.createHTML(data.message)}></div>
                {editDelete}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
