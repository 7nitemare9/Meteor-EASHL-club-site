import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NavDropdown from './NavDropdown.jsx';

export default class NavLogin extends TrackerReact(Component) {

    getLinks() {
      var links = [];
      if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
        links.push(
            {link: '/admin/fanzone', name: 'Add Media'},
            {link: '/admin/users', name: 'Manage Users'},
            {link: '/admin/forum', name: 'Add Forum Category'}
        );
      }
      if (Roles.userIsInRole(Meteor.user(), ['News-poster', 'Admin'])) {
        links.push(
            {link: '/admin/news', name: 'Add News'}
        );
      }
      if (Roles.userIsInRole(Meteor.user(), ['Event-scheduler', 'Admin'])) {
        links.push(
            {link: '/admin/schedule', name: 'Schedule Event'}
        );
      }
      links.push(
        {link: '/user', name: 'Edit Profile'},
        {link: '/login', name: 'Sign Out'}
      );
      console.log(links);
      return links;
    }

    render() {
      if (Meteor.user()) {
        return (<NavDropdown target="login" name={Meteor.user().profile.gamertag || Meteor.user().profile.name} sites={this.getLinks()} />);
      }
        return (
            <li className="log_in_out">
                <a className={`nav-${this.props.target}`} href={this.props.route}>
                    <img src={`/assets/nav/${this.props.target}_hover.png`} />
                </a>
            </li>
        )
    }
}
