import React, { Component } from 'react';
import Navbar from './navbar/Navbar.jsx';
import NavToggle from './navbar/NavToggle.jsx';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-default" role="navigation">
                <a href="/" >
                    <img className="img-responsive" src="/assets/header.png" />
                </a>
                <NavToggle />
                <Navbar />
            </nav>
        )
    }
}