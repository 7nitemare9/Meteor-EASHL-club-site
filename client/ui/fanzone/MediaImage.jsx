import React, { Component } from 'react';
import * as Youtube from '../helpers/Youtube.js';

export default class MediaImage extends Component {

  getImage(data) {
    if (data.type == "image") {
      return data.link;
    } else {
      return Youtube.youtubeToImage(data.link);
    }
  }

  render() {
    console.log(Youtube);
    return (
      <li className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
        <img src={this.getImage(this.props.media)} alt=""/>
      </li>
    )
  }
}
