import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AdmStreams extends TrackerReact(Component) {

  getStreams() {
    return TwitchNames.find().fetch();
  }

  onComplete(err, data) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    } else {
      Bert.alert(data, 'success', 'fa-check');
      this.refs.name.value = '';
      this.refs.id.value = 'none';
    }
  }

  editStream(stream) {
    this.refs.name.value = stream.name;
    this.refs.id.value = stream._id;
  }

  deleteStream(stream) {
    Meteor.call('removeTwitchName', stream.name, this.onComplete.bind(this));
  }

  handleStream(event) {
    event.preventDefault();
    console.log(this.refs.id.value);
    if (this.refs.id.value !== 'none') {
      console.log('update twitch name');
      Meteor.call('updateTwitchName', this.refs.id.value.trim(), this.refs.name.value.trim(), this.onComplete.bind(this));
    } else {
      console.log('add twitch name');
      Meteor.call('addTwitchName', this.refs.name.value.trim(), this.onComplete.bind(this));
    }
  }

  render() {
    this.state = {subscription: {twitchStreams: Meteor.subscribe('twitchStreams')}};

    if (!this.state.subscription.twitchStreams.ready()) {
      return (<div>Loading...</div>)
    }
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>MANAGE STREAMS</p2>
              </p>
              <div className="adm-content">
                <form onSubmit={this.handleStream.bind(this)} >
                  <input type="hidden" value="none" ref="id" />
                  Stream Name:<input type="text" label="Name" ref="name" />
                  <input type="submit" value="submit" />
                </form>
                {this.getStreams().map(stream => {
                  return (
                    <div>
                      <p3>{stream.name}</p3>
                      <a href="#" onClick={() => {this.editStream(stream)}}>edit </a>
                      <a href="#" onClick={() => {this.deleteStream(stream)}}> delete</a>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
