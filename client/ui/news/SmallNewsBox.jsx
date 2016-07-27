import React, { Component } from 'react';
import * as NewsHelper from '../helpers/NewsHelper.js';

export default class SmallNewsBox extends Component {

  render() {
    let style = Object.assign({padding: "10px 5px 0px 5px"}, this.props.style);
    if (this.props.news === undefined) {
      return (<div></div>)
    }
    return (
      <div key={this.props.news._id} className={`col-lg-4 visible-lg ${this.props.class}`}
      style={style} >
          <div className="b_box old-news-box" >
              <img src={NewsHelper.getImage(this.props.news)} />
          </div>
          <div className="old-news-title">
              <a href={`/news/${this.props.news._id}`} >{this.props.news.title.toUpperCase()}</a>
          </div>
      </div>
    )
  }
}
