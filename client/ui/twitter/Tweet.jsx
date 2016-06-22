import React, { Component } from 'react';

export default class Tweet extends Component {

  findURL(data) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    if (data.match(urlRegex)) {
      return data.match(urlRegex)[0];      
    }
  }

  render() {
    return (
      <tr>
        <td>
          <img className="tweet-image" src={this.props.tweet.user.profile_image_url} alt=""/>
        </td>
        <td className="tweet-text">
          <a href={this.findURL(this.props.tweet.text)}>{this.props.tweet.text}</a>
        </td>
      </tr>
    )
  }
}
