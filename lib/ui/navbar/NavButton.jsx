import React, { Component } from 'react';
import Radium from 'radium';

class NavButton extends Component {

  getCSS(style) {
    switch(style) {
      case 'a':
        return(
          {
            display: 'block',
            textDecoration: 'none',
            fontFamily: 'myriad',
            fontSize: '10px',
            textShadow: '-2px 1px black',
            width: '100%',
            height: '34px',
            paddingTop: '9px',
            ':hover': {
              background: 'rgba(255,255,255,0.05)'
            }
          }
        )
      case 'li':
        return (
          {
            height: '100%',
            textAlign: 'center',
            flexGrow: '1'
          }
        )
    }
  }

    render() {
        return (
          <li style={this.getCSS('li')}>
            <a style={this.getCSS('a')} href={this.props.route}>
                {this.props.target.toUpperCase()}
            </a>
          </li>
        )
    }
}

export default NavButton = Radium(NavButton);
