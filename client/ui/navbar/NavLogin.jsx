import React, { Component } from 'react';

export default class NavLogin extends Component {
    render() {
        return (
            <li className="log_in_out">
                <a className={`nav-${this.props.target}`} data-toggle="modal" href="#myModal">
                    <img src={`/assets/nav/${this.props.target}_hover.png`} />
                </a>
            </li>
        )
    }
}