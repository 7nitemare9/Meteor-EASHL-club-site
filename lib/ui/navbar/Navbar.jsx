import React, { Component } from 'react';
import NavButton from './NavButton.jsx';
import NavDropdown from './NavDropdown.jsx';
import NavLogin from './NavLogin.jsx';
import Radium from 'radium';

export default class Navbar extends Component {

  getCSS(style) {
    switch(style) {
      case 'navbar':
        return (
          {
            width: '100%',
            display: 'flex',
            height: '32px',
            background: 'url(assets/nav/filler.jpg)'
          }
        )
      case 'ul':
        return (
          {
            display: 'flex',
            listStyle: 'none',
            justifyContent: 'space-around',
            width: '1100px'
          }
        )
      case 'login':
        return (
          {
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            listStyle: 'none'
          }
        )
      case 'lButton':
        return (
          {
            width: '100px'
          }
        )
    }
  }

    render() {
        let sites = [
            {link: "http://www.nhl.com", name: "NHL.com"},
            {link: "http://www.easports.com/nhl", name: "EA sports NHL"},
            {link: "http://youtube.com/2bcproductions", name: "2bcproductions"},
            {link: "http://synergyhockey.wordpress.com", name: "Synergy Hockey"},
            {link: "http://nhlgamer.com", name: "NHL Gamer"},
            {link: "http://www.operationsports.com", name: "Operation Sports"},
            {link: "http://www.shl.se", name: "SHL"}
        ];
        return (
            <div style={this.getCSS('navbar')} id="bs-example-navbar-collapse-1">
                <ul style={this.getCSS('ul')}>
                    <NavButton target="home" route="/" />
                    <NavButton target="lineup" route="/lineup" />
                    <NavButton target="statistics" route="/statistics" />
                    <NavButton target="fan zone" route="/fanzone" />
                    <NavButton target="club info" route="/clubinfo/0" />
                    <NavButton target="results" route="/matches/list/0" />
                    <NavDropdown target="links" sites={sites} />
                    <NavButton target="forum" route="/forum" />
                </ul>
                <div style={this.getCSS('login')}>
                  <div style={this.getCSS('lButton')}>
                    <NavLogin target="login" route="/login" />
                  </div>
                </div>
            </div>
        )
    }

}
