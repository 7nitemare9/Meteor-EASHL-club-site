import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RegisteredUsers from './RegisteredUsers.jsx';

export default class Event extends TrackerReact(Component) {

  getEvent() {
    return Schedule.findOne({_id: this.props.id});
  }

  onComplete(err, data) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    } else {
      Bert.alert(data, 'success', 'fa-check');
      FlowRouter.go('/');
    }
  }

  deleteEvent() {
    Meteor.call('deleteEvent', this.props.id, this.onComplete.bind(this));
  }

  signup(event) {
    event.preventDefault();
    Meteor.call('signupToEvent', this.getEvent()._id, this.onComplete);
  }

  render() {
    this.state = {subscription: {event: Meteor.subscribe('oneEvent', this.props.id)}}
    if (!this.state.subscription.event.ready()) {
      return (<div>Loading...</div>)
    }
    console.log(this.getEvent().signupable)
    const registeredUsers = this.getEvent().registered ? <RegisteredUsers event={this.getEvent()} /> : <div></div>;
    const signupable = (this.getEvent().signupable && (!this.getEvent().registered || !~this.getEvent().registered.indexOf(Meteor.user()._id))) ?
                        <form onSubmit={this.signup.bind(this)}><input type="submit" value="signup" ref="signup" /></form> : <div></div>;
    const links = Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler']) ?
      <div>
        <a href={`/admin/editevent/${this.props.id}`}>edit </a>
        <a href="#" onClick={this.deleteEvent.bind(this)}> delete</a>
      </div> : <div></div>
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
              </p>
              <div>
                <p>{this.getEvent().date}</p>
                <p3>{this.getEvent().description}</p3>
                {registeredUsers}
                {signupable}
                {links}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
