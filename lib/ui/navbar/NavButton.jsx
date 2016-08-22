import React, { Component } from 'react';

export default class NavButton extends Component {
    
    render() {
        return (
            <li>
                <a className={`nav-${this.props.target}`} href={this.props.route}>
                    <img src={`/assets/nav/${this.props.target}_hover.png`}/>
                </a>
            </li>
        )
    }
}