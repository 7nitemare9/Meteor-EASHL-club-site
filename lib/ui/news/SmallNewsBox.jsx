import React, { Component } from 'react';
import Radium from 'radium';
import * as NewsHelper from '../helpers/NewsHelper.js';
import Box from '../commonCSS/box.js';
import Colors from '../commonCSS/colors.js';

class SmallNewsBox extends Component {

  render() {
    let style = {
      box: {
        ...Box.box,
        ':hover': {
          boxShadow: '0 2px 6px rgba(0,0,0,0.17), 0 4px 6px rgba(0,0,0,0.23)'
        }
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
        background: Colors.darkestGrey,
        opacity: '0.95'
      },
      titleText: {
        margin: '7px',
        fontSize: '10px',
        fontFamily: 'Merriweather',
        fontWeight: '400'
      }
    };
    if (this.props.news === undefined) {
      return (<div></div>)
    }
    return (
      <a href={`/news/${this.props.news._id}`} >
        <div  style={{...this.props.class, ...style.newsCard}}>
            <div key={this.props.news._id} style={style.box} >
                <img src={NewsHelper.getImage(this.props.news)} style={{width: '200px', height: '130px'}}/>
            </div>
              <div style={style.newsTitle}>
                <p style={style.titleText}>{this.props.news.title}</p>
              </div>
        </div>
      </a>
    )
  }
}
export default SmallNewsBox = Radium(SmallNewsBox);