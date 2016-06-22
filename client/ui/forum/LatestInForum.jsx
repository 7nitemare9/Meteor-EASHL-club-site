import React, { Component } from 'react';

export default class LatestInForum extends Component {

  render() {
    return (
      <div className="col-lg-3 b_column col-md-4 col-sm-6 col-xs-12">
        <div className="b_box latest-forum">
          <div className="b_header">
            <img src="/assets/forumposts.png" />
          </div>
          <li className="list-group-item">
            <a href="">
              <p>Not Signed In</p>
            </a>
          </li>
          <li className="list-group-item">
            <a href="">
            </a>
          </li>
          <li className="list-group-item">
            <a href="">
            </a>
          </li>
          <li className="list-group-item">
            <a href="">
            </a>
          </li>
          <li className="list-group-item">
            <a href="">
            </a>
          </li>
        </div>
      </div>
    )
  }

}
