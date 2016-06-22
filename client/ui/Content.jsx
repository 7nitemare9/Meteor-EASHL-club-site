import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Content extends Component {
    render() {
        return (
                <div className="b_main_content">
                  <ReactCSSTransitionGroup
                    transitionName="contentAnim"
                    transitionEnterTimeout={1000}
                    transitionAppearTimeout={1000}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                  >
                    <div key={this.props.content.type.name} style={{width: '636px'}}>{this.props.content}</div>
                  </ReactCSSTransitionGroup>
            </div>
        )
    }
}
