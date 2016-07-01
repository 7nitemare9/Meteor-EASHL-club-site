import React, { Component } from 'react';
import NavButton from './NavButton.jsx';
import NavDropdown from './NavDropdown.jsx';
import NavLogin from './NavLogin.jsx';

export default class Navbar extends Component {
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
            <div className="collapse navbar-collapse nav-filler b_navigation" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <NavButton target="home" route="/" />
                    <NavButton target="lineup" route="/lineup" />
                    <NavButton target="stats" route="/statistics" />
                    <NavButton target="media" route="/fanzone" />
                    <NavButton target="info" route="/infos" />
                    <NavButton target="results" route="/matches/list/0" />
                    <NavDropdown target="links" sites={sites} />
                    <NavButton target="forum" route="/forum" />
                    <NavLogin target="login" />
                </ul>
            </div>
        )
    }

}
