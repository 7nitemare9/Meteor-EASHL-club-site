import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AdmUsers extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {subscription: {
      users: Meteor.subscribe('allUsers')
    }}
    this.state.subscription.deletedUsers = Meteor.subscribe('deletedUsers');
  }
  componentDidMount() {
    $("#deleted-users").hide();
  }

  componentDidUpdate() {
    console.log('component did update');
    $("#deleted-users").hide();
  }

  getUsers() {
    return Meteor.users.find().fetch();
  }

  getDeletedUsers() {
    return DeletedUsers.find().fetch();
  }

  onComplete(err, data) {
    if (err) {
      Bert.alert(err, 'warning');
    } else {
      Bert.alert(data, 'success');
    }
  }

  deleteUser(user) {
    Meteor.call('moveToDeleted', user, this.onComplete.bind(this));
  }

  reinsertUser(id) {
    Meteor.call('returnDeletedUser', id, this.onComplete.bind(this));
  }

  toggleRole(id, role) {
    if (Meteor.user()._id === id && role === 'Admin') {
      Bert.alert('You can not remove you own Admin right', 'warning', 'fixed-top', 'fa-warning');
    } else {
      Meteor.call('toggleRole', id, role);
    }
  }

  toggleDeletedUsers() {
    $("#deleted-users").toggle();
  }

  checked(id, role) {
    if (Meteor.users.findOne({_id: id}).roles){
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
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>Users</p2>
              </p>
              <div className="adm-content">
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
                          <td><a href="" onClick={this.deleteUser.bind(this, user)}>delete</a></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div>
                  <p3><a onClick={this.toggleDeletedUsers}>Deleted Users</a></p3>
                  <table id="deleted-users">
                    <thead>
                      <tr>
                        <td>Gamertag/Name</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.getDeletedUsers().map((user) => {
                        return (
                          <tr>
                            <td>{user.profile.gamertag || user.profile.name}</td>
                            <td><a href="" onClick={this.reinsertUser.bind(this, user._id)}>re-insert user</a></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
