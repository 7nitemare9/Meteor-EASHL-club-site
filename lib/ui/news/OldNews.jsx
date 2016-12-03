import React, { Component } from 'react';
import News from './News.jsx';
import SmallNewsBox from './SmallNewsBox.jsx';
import * as NewsHelper from '../helpers/NewsHelper.js';
import Box from '../commonCSS/box.js';

export default class OldNews extends Component {
    constructor() {
        super();
        this.style = {
            box: Box.box,
            visibleLg: {
                display: 'none',                
                '@media (min-width: 1341px)': {
                    display: 'block',
                }
            },
            smallNewsContainer: {
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            },
            archiveButton: {
                marginTop: '20px'
            },
            archiveImage: {
                height: '22px',
                background: 'url(assets/archive.png) no-repeat center'
            }
        }
    }

    render() {
        return (
            <div style={this.style.smallNewsContainer}>
                {this.props.newsData.slice(5, 11).map((data) => {
                    return (
                      <SmallNewsBox key={data._id} news={data} class={this.style.visibleLg} />
                )})}
                <div style={{...this.style.box, ...this.style.archiveButton}}>
                    <a href="/news/archive/0">
                        <div style={this.style.archiveImage}></div>
                    </a>
                </div>
            </div>
        )
    }
}
