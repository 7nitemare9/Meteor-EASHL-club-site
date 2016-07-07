import React, { Component } from 'react';

export default class NavDropdown extends Component {
    render() {
        return (
            <li className="dropdown">
                <a className={`nav-${this.props.target} drop-down-toggle`} data-toggle="dropdown" href="#">
                    <img src={`/assets/nav/${this.props.target}_hover.png`} />
                </a>
                <ul className="dropdown-menu">
                    {this.props.sites.map((data, index) => {
                        return (
                            <li key={index} className="list-group-item">
                                <a href={data.link}>{data.name}</a>
                            </li>
                        )
                    })}
                </ul>
            </li>
        )
    }
}
