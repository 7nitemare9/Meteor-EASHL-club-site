import React, { Component } from 'react';
import News from './News.jsx';
import SmallNewsBox from './SmallNewsBox.jsx';
import * as NewsHelper from '../helpers/NewsHelper.js';

export default class OldNews extends Component {

    render() {
        return (
            <div className="border-box-set">
                {this.props.newsData.slice(5, 11).map((data) => {
                    return (
                      <SmallNewsBox key={data._id} news={data} class="visible-lg"/>
                )})}
                <div className="b_box archive-box">
                    <a href="/news/archive/0">
                        <div className="col-lg-12 archive-image"></div>
                    </a>
                </div>
            </div>
        )
    }
}
