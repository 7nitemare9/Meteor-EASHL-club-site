import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AdmUsers extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {subscription: {
      users: Meteor.subscribe('allUsers')
    }}
  }

  getUsers() {
    return Meteor.users.find().fetch();
  }

  toggleRole(id, role) {
    console.log(id, role);
    Meteor.call('toggleRole', id, role);
  }

  checked(id, role) {
    if (Meteor.users.findOne({_id: id}).roles){
      console.log(!!~Meteor.users.findOne({_id: id}).roles.indexOf(role));
      return !!~Meteor.users.findOne({_id: id}).roles.indexOf(role);
    }
    return "";
  }

  render() {
    if (!Roles.userIsInRole(Meteor.user(), ["Admin"])) {
      return(
        <div>Access Denied, only Admins can change users roles</div>
      )
    }
    if (!this.state.subscription.users.ready()) {
      return (<div>Users<p>Loading...</p></div>)
    }
    if (!Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      return (<div>Access Denied, you don't have permission to manage users.</div>);
    }
    return (
      <div>Users
        <table>
          <thead>
            <tr>
              <td>Gamertag/Name</td><td>Admin</td><td>Team-member</td><td>News-poster</td><td>Event-scheduler</td>
            </tr>
          </thead>
          <tbody>
            {this.getUsers().map((user) => {
              return (
                <tr>
                  <td>{user.profile.gamertag || user.profile.name}</td>
                  <td><input type="checkbox" readOnly={true} checked={this.checked(user._id, 'Admin')} onClick={() => {this.toggleRole(user._id, 'Admin')}} /></td>
                  <td><input type="checkbox" readOnly={true} checked={this.checked(user._id, 'Team-member')} onClick={() => {this.toggleRole(user._id, 'Team-member')}} /></td>
                  <td><input type="checkbox" readOnly={true} checked={this.checked(user._id, 'News-poster')} onClick={() => {this.toggleRole(user._id, 'News-poster')}} /></td>
                  <td><input type="checkbox" readOnly={true} checked={this.checked(user._id, 'Event-scheduler')} onClick={() => {this.toggleRole(user._id, 'Event-scheduler')}} /></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
