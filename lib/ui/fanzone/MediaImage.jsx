import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import * as Youtube from '../helpers/Youtube.js';

export default class MediaImage extends TrackerReact(Component) {

  getImage(data) {
    if (data.type == "image") {
      return data.link;
    } else {
      return Youtube.youtubeToImage(data.link);
    }
  }

  onComplete(err) {
    if (err) {
      Bert.alert(err.error, 'warning', 'fa-frown');
    } else {
      Bert.alert('Media deleted', 'success', 'fa-check');
      Session.set('showModal', false);
      FlowRouter.go('/fanzone');
    }
  }

  deleteMedia() {
    var id = this.props.media._id;
    Meteor.call('deleteMedia', id, this.onComplete.bind(this));
  }

  modalData(data) {
    console.log(data);
    var deleteFunction = function () { this.deleteMedia(data._id)};
    if (~data.link.indexOf('youtu')) {
      return (`<iframe width="560" height="315" src=${Youtube.embedYoutube([data.link])} frameborder="0" allowfullscreen></iframe>`)
    } else if (data.link.length > 0) {
      return (`<img src=${data.link} />`)
    } else {
      return ('<div></div>')
    }
  }

  openModal(data) {
    Session.set('modalContent', this.modalData(data));
    Session.set('showModal', true);
  }

  render() {
    var isAdmin = Roles.userIsInRole(Meteor.user(), ['Admin']) ? <a href="#" onClick={this.deleteMedia.bind(this)}>delete</a> : '';
    return (
      <li className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
        <img onClick={() => this.openModal(this.props.media)} src={this.getImage(this.props.media)} alt=""/>
        {isAdmin}
      </li>
    )
  }
}
