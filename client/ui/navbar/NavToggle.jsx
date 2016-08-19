import React, { Component } from 'react';

export default class NavToggle extends Component {
    render() {
        return (
            <div className="navbar-header nav-filler b_navigation">
                <button className="navbar-toggle" data-target="#bs-example-navbar-collapse-1" data-toggle="collapse" type="button">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div>
        )
    }
}
