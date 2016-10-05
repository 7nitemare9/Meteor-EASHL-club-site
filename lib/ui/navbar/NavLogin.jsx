import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NavDropdown from './NavDropdown.jsx';

export default class NavLogin extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {links: []};
    this.state.subscription = {user: Meteor.subscribe('thisUser')};
  }

    getLinks() {
      var links = [];
      if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
        links.push(
            {link: '/admin/fanzone', name: 'Add Media'},
            {link: '/admin/users', name: 'Manage Users'},
            {link: '/admin/forumcategory', name: 'Add Forum Category'},
            {link: '/admin/streams', name: 'Handle Streams'},
            {link: '/admin/manualupdates', name: 'Manual Updates'}
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
      if (Roles.userIsInRole(Meteor.user(), ['Team-member', 'Admin'])) {
        links.push(
          {link: '/teamchat', name: 'Team Chat'}
        );
      }
      links.push(
        {link: '/user', name: 'Edit Profile'},
        {link: '/signout', name: 'Sign Out'}
      );
      return links;
    }


    componentDidUpdate() {
      if (this.state.subscription.user.ready() && this.state.links.length === 0) {
        this.setState({links: this.getLinks()});
      }
    }

    componentDidMount() {
      if (this.state.subscription.user.ready() && this.state.links.length === 0) {
        this.setState({links: this.getLinks()});
      }
    }

    render() {
      if (Meteor.user() && this.state.subscription.user.ready()) {
        return (<NavDropdown target="login" name={Meteor.user().profile.gamertag || Meteor.user().profile.name} sites={this.state.links} />);
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
