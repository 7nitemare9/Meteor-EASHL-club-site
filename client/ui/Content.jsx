import React, { Component } from 'react';

export default class Content extends Component {
    render() {
        return (
            <div className="col-lg-6 col-md-8 b_img-responsive col-lg-push-3 b_bottom-padding">
                <div className="b_main_content">
                    {this.props.content}
                </div>
            </div>
        )
    }
}