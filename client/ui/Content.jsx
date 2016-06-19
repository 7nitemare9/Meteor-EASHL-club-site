import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Content extends Component {
    render() {
        return (
            <div className="col-lg-6 col-md-8 b_img-responsive col-lg-push-3 b_bottom-padding">
                <div className="b_main_content">
                  <ReactCSSTransitionGroup
                    transitionName="contentAnim"
                    transitionEnterTimeout={1000}
                    transitionAppearTimeout={1000}
                    transitionLeaveTimeout={500}
                    transitionAppear={true}
                  >
                    <div key={this.props.content.type.name}>{this.props.content}</div>
                  </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
}
