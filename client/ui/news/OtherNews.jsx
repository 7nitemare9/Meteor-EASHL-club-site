import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class OtherNews extends Component {
    changeToThis(index) {
        Session.set('counter', index);
    }
    
    render() {
        return (
            <div className="other_news">
                {this.props.newsData.slice(0,5).map((data, index) => {
                    let active = "";
                    (index == Session.get('counter') ? active = "act-" : active = "");
                    if (active == "act-") {
                        return (
                            <ReactCSSTransitionGroup
                                transitionName="active-news"
                                transitionEnterTimeout={1000}
                                transitionLeaveTimeout={1000}
                                key={data._id}
                            >
                                <div key={`${active}test${data._id}`} id={`${active}nl${index}`} onMouseOver={this.changeToThis.bind(this, index)}>
                                    <br/>
                                    <a href={`/${data.id}`} id={`${active}anl${index}`} >
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
                                <div key={`${active}test${data._id}`} id={`${active}nl${index}`} onMouseOver={this.changeToThis.bind(this, index)}>
                                    <br/>
                                    <a href={`/${data.id}`} id={`${active}anl${index}`} >
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