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

  modalData(data) {
    console.log(data);
    if (~data.indexOf('youtu')) {
      return (`<iframe width="560" height="315" src=${Youtube.embedYoutube([data])} frameborder="0" allowfullscreen></iframe>`)
    } else if (data.length > 0) {
      return (`<img src=${data} />`)
    } else {
      return ('<div></div>')
    }
  }

  openModal(data) {
    Session.set('modalContent', this.modalData(data.link));
    Session.set('showModal', true);
  }

  render() {
    return (
      <li className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
        <img onClick={() => this.openModal(this.props.media)} src={this.getImage(this.props.media)} alt=""/>
      </li>
    )
  }
}
