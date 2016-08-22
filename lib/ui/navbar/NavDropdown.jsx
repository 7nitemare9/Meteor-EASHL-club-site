import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NavDropdown extends TrackerReact(Component) {
    render() {
      let button = this.props.name ? this.props.name.toUpperCase() : <img src={`/assets/nav/${this.props.target}_hover.png`} />;
      let buttonClass =  this.props.name ? 'profile' : this.props.target;
      let profileClass = this.props.name ? 'dropdown ddprofile' : 'dropdown';
      let missedMessages = this.props.name && Meteor.user().profile.missedMessages ? <a className="missed" href="/teamchat">{`${Meteor.user().profile.missedMessages} !`}</a> : "";
        return (
            <li className={profileClass}>
                {missedMessages}
                <a className={`nav-${buttonClass} drop-down-toggle`} data-toggle="dropdown" href="#">
                  {button}
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
