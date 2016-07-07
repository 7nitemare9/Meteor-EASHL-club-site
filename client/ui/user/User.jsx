import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class User extends TrackerReact(Component) {

  updateUser(event) {
    event.preventDefault();
    Meteor.users.update({_id: Meteor.user()._id},
      {$set: {'profile.name': this.refs.name.value.trim(),
             'profile.gamertag': this.refs.gamertag.value.trim()
           }
      }
    );
  }

  render() {
    console.log(Meteor.user());
    if (!Meteor.user()) {
      return (
        <div>Not logged in</div>
      )
    }
    console.log(Meteor.user().profile);
    let user = Meteor.user().profile || {name: "John Doe"};
    console.log(user);
    let title = user.gamertag || user.name;
    title = title || "John Doe";
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="content">
            <p>
              <img src="/assets/blank.jpg" alt=""/>
              <p2>{`USER PROFILE FOR ${title.toUpperCase()}`}</p2>
            </p>
          </div>
          <form onSubmit={this.updateUser.bind(this)} >
            <p>Name: </p><input type="text" ref="name" defaultValue={user.name} />
            <p>Gamertag: </p><input type="text" ref="gamertag" defaultValue={user.gamertag} />
            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
    )
  }

}
