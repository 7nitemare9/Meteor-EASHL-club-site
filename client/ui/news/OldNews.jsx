import React, { Component } from 'react';
import News from './News.jsx';
import * as NewsHelper from '../helpers/NewsHelper.js';

export default class OldNews extends Component {

    render() {
        return (
            <div className="border-box-set">
                {this.props.newsData.slice(5, 11).map((data) => {
                    return (
                        <div key={data._id} className="col-lg-4 visible-lg" style={{padding: "10px 5px 0px 5px"}}>
                            <div className="b_box old-news-box" >
                                <img src={NewsHelper.getImage(data)} />
                            </div>
                            <div className="old-news-title">
                                <a href={`/news/${data._id}`} >{data.title.toUpperCase()}</a>
                            </div>
                        </div>
                )})}
                <div className="b_box archive-box">
                    <a href="/archive">
                        <div className="col-lg-12 archive-image"></div>
                    </a>
                </div>
            </div>
        )
    }
}
