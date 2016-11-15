import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Colors from '../commonCSS/colors.js';

export default class OtherNews extends Component {
  constructor() {
    super();
    this.style = {
      otherNews: {
        position: 'absolute',
        top: '100px',
        fontSize: 'xx-small',
        height: '75px',
        width: '100%',
        padding: '5px',
        display: 'flex',
        justifyContent: 'space-around'
      },
      activeTab: {
        background: Colors.darkestGrey,
        textAlign: 'center',
        width: '90px',
        height: '90%',
        margin: '-0.8% 0.8% 1% 0.8%',
        boxShadow: '0 6px 12px rgba(0,0,0,0.16), 0 6px 12px rgba(0,0,0,0.26)'
      },
      activeTitle: {
        padding: '5px',
        display: 'block',
        marginTop: '-10px',
        color: Colors.secondary,
        textDecoration: 'none',
        fontSize: 'x-small'
      },
      tab: {
        background: Colors.darkGrey,
        textAlign: 'center',
        width: '90px',
        height: '90%',
        margin: '-0.8% 0.8% 1% 0.8%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.26)'
      },
      title: {
        padding: '5px',
        display: 'block',
        marginTop: '-10px',
        color: Colors.secondaryDimmed,
        textDecoration: 'none',
        fontSize: 'x-small'
      }
    }
  }

    render() {
        return (
            <div style={this.style.otherNews}>
                {this.props.newsData.slice(0,5).map((data, index) => {
                    let active = "";
                    index == this.props.counter ? active = "act-" : active = "";
                    if (active == "act-") {
                        return (
                            <ReactCSSTransitionGroup
                                transitionName="active-news"
                                transitionEnterTimeout={1000}
                                transitionLeaveTimeout={1000}
                                key={data._id}
                            >
                                <div key={`${active}test${data._id}`} style={this.style.activeTab} onMouseOver={() => this.props.setCounter(index)}>
                                    <br/>
                                    <a href={`/news/${data._id}`} style={this.style.activeTitle}>
                                        {data.title}
                                    </a>
                                </div>
                            </ReactCSSTransitionGroup>
                        )
                    } else {
                        return (
                            <ReactCSSTransitionGroup
                                transitionName="inactive-news"
                                transitionEnterTimeout={1000}
                                transitionLeaveTimeout={1000}
                                key={data._id}
                            >
                                <div key={`${active}test${data._id}`} style={this.style.tab} onMouseOver={() => this.props.setCounter(index)}>
                                    <br/>
                                    <a href={`/news/${data._id}`} style={this.style.title}>
                                        {data.title}
                                    </a>
                                </div>
                            </ReactCSSTransitionGroup>
                        )
                }})}
            </div>
        )
    }
  }
