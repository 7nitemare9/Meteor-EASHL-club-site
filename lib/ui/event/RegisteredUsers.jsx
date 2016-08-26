import React, { Component } from 'react';
import TrackerReact from  'meteor/ultimatejs:tracker-react';

export default class RegisteredUsers extends TrackerReact(Component) {

  onComplete(err, data) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    } else {
      Bert.alert(data, 'success', 'fa-check');
      FlowRouter.go(`/event/${this.props.event._id}`);
    }
  }

  unRegister(event) {
    event.preventDefault();
    Meteor.call('unRegisterFromEvent', this.props.event._id, this.onComplete.bind(this));
  }

  getUser(id) {
    return Meteor.users.findOne({_id: id});
  }

  render() {
    this.state = {subscription: {users: Meteor.subscribe('allUserProfiles')}};
    if (!this.state.subscription.users.ready()) return <div>Loading...</div>;
    return (
      <div>
        Signed up team-members:
        {this.props.event.registered.map(user => {
          const link = (Meteor.user()._id === user) ? <a onClick={this.unRegister.bind(this)}>unregister</a> : <div></div>;
          return (
            <div>
              <p3>{this.getUser(user).profile.gamertag || this.getUser(user).profile.name}</p3>
              {link}
            </div>
          )
        })}
      </div>
    )
  }
}
