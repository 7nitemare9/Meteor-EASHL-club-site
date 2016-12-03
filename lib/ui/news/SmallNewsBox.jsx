import React, { Component } from 'react';
import Radium from 'radium';
import * as NewsHelper from '../helpers/NewsHelper.js';
import Box from '../commonCSS/box.js';
import Colors from '../commonCSS/colors.js';

class SmallNewsBox extends Component {

  render() {
    let style = {
      box: {
        ...Box.box        
      },
      newsCard: {
        width: '200px',
        height: '130px',
        marginTop: '20px'
      },
      newsTitle: {
        float: 'left',
        position: 'absolute',
        marginTop: '-40px',
        width: '200px',
        height: '40px',
        display: 'flex',
        background: Colors.darkGrey,
        opacity: '0.95'
      },
      titleText: {
        margin: 'auto',
        fontSize: '10px',
        fontWeight: '600',
        textAlign: 'center'
      }
    };
    if (this.props.news === undefined) {
      return (<div></div>)
    }
    return (
      <div key={this.props.news._id} style={{...this.props.class, ...style.newsCard}}>
          <div style={style.box} >
              <img src={NewsHelper.getImage(this.props.news)} style={{width: '200px', height: '130px'}}/>
          </div>
          <a href={`/news/${this.props.news._id}`} >
            <div style={style.newsTitle}>
              <p style={style.titleText}>{this.props.news.title.toUpperCase()}</p>
            </div>
          </a>
      </div>
    )
  }
}
export default SmallNewsBox = Radium(SmallNewsBox);