import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ImageUpload from '../admin/ImageUpload.jsx';

export default class User extends TrackerReact(Component) {

  updateUser(event) {
    event.preventDefault();
    Meteor.users.update({_id: Meteor.user()._id},
      {$set: {'profile.name': this.refs.name.value.trim(),
             'profile.gamertag': this.refs.gamertag.value.trim(),
             'profile.image': this.image
           }
      }
    );
  }

  setImageLink(data) {
    this.image = data.link;
  }

  render() {
    if (!Meteor.user()) {
      return (
        <div>Not logged in</div>
      )
    }
    let user = Meteor.user().profile || {name: "John Doe"};
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
          <form onSubmit={this.updateUser.bind(this)} className="user-form">
            <p>Name: </p><input type="text" ref="name" defaultValue={user.name} />
            <p>Gamertag: </p><input type="text" ref="gamertag" defaultValue={user.gamertag} />
            <p>Profile image: </p><img src={user.image} width="64" height="64" /><br/><br/><ImageUpload fn={this.setImageLink.bind(this)}/>
            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
    )
  }

}
