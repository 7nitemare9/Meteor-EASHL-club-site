import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ChatList from './ChatList.jsx';

export default class TeamChat extends TrackerReact(Component) {

  getChatMessages() {
    return ChatMessages.find().fetch();
  }

  addMessage(event) {
    event.preventDefault();
    if (!Session.get('editChat')) {
      Meteor.call('addChatMessage', Meteor.user(), this.refs.chatMessage.value.trim(), function(err, value) {
        if (!err) {
          $('#edit').froalaEditor('html.set', "", true);
        }
      });
    } else {
      Meteor.call('updateChatMessage', Session.get('editChat'), this.refs.chatMessage.value.trim(), function(err, value) {
        if (!err) {
          $('#edit').froalaEditor('html.set', "", true);
          Session.set('editChat', "");
        }
      });
    }
  }

  componentDidUpdate() {
    $('#edit').froalaEditor({
      imageUploadURL: 'admin/imageupload',
      height: 150,
      imageDefaultWidth: 200,
      imageDefaultAlign: 'left',
      videoDefaultAlign: 'left',
      toolbarButtons: ['emoticons', 'align', 'insertImage', 'insertVideo'],
      toolbarButtonsMD: ['emoticons', 'align', 'insertImage', 'insertVideo'],
      toolbarButtonsSM: ['emoticons', 'align', 'insertImage', 'insertVideo'],
      toolbarButtonsXS: ['emoticons', 'align', 'insertImage', 'insertVideo'],
    });
    $('#edit').on('froalaEditor.video.inserted', function(e, editor, $video) {
      $video.children()[0].width = 200;
      $video.children()[0].height = 112;
    });
  }


  render() {
    this.state = {subscription: {chatMessages: Meteor.subscribe('allChatMessages')}}
    if (!this.state.subscription.chatMessages.ready()) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="b_box" >
        <div className="b_box" >
          <div className="content">
            <p>
              <img src="/assets/blank.jpg" />
              <p2>TEAM CHAT</p2>
            </p>
            <ChatList messages={this.getChatMessages()} />
            <form onSubmit={this.addMessage.bind(this)}>
              <textarea id="edit" ref="chatMessage" />
              <input type="submit" value="Send" style={{width: "620px", height: "50px"}}/>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
