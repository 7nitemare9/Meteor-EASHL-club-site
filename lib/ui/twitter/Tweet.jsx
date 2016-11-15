import React, { Component } from 'react';

export default class Tweet extends Component {
  constructor() {
    super();
    this.style = {
      link: {
        fontSize: '11px',
        padding: '5px'
      },
      image: {
        height: '55px',
        width: '55px',
        padding: '10px'
      }
    }
  }

  findURL(data) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    if (data.match(urlRegex)) {
      return data.match(urlRegex)[0];      
    }
  }

  render() {
    return (
      <li style={this.props.style}>
        <img src={this.props.tweet.user.profile_image_url} style={this.style.image} alt=""/>
        <a href={this.findURL(this.props.tweet.text)} style={this.style.link}>{this.props.tweet.text}</a>
      </li>
    )
  }
}
