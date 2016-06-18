import React, { Component } from 'react';
import News from './News.jsx';

export default class OldNews extends Component {
    
    youtubeToImage(image) {
        return (
            image.replace(
                image.substring(0,
                    image.indexOf('embed/') + 6),
                'http://img.youtube.com/vi/').concat('/0.jpg')
        )
    }

    getImage(data) {
        if (data) {
            if (data.image.length != 0) {
                return data.image[0];
            } else if (data.youtube.length != 0) {
                return this.youtubeToImage(data.youtube[0]);
            } else {
                return "test.jpg";
            }
        }
    }
    render() {
        return (
            <div className="border-box-set">
                {this.props.newsData.slice(5, 11).map((data) => {
                    return (
                        <div key={data._id} className="col-lg-4 visible-lg" style={{padding: "10px 5px 0px 5px"}}>
                            <div className="b_box old-news-box" >
                                <img src={this.getImage(data)} />
                            </div>
                            <div className="old-news-title">
                                <a href={`/${data.id}`} >{data.title.toUpperCase()}</a>
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