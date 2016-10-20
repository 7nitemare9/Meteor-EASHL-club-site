import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Radium, { Style } from 'radium';

class NavDropdown extends TrackerReact(Component) {

  getCSS(style) {
    let pulse = Radium.keyframes({
      '0%': {color: '#fbb600', textShadow: '-2px 1px black'},
      '50%': {color: '#fff', textShadow: '-1px 1px #fbb600'},
      '100%': {color: '#fbb600', textShadow: '-2px 1px black'}
    })
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
      case 'missedA':
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
            },
            animation: 'x 2s ease 0s infinite',
            animationName: pulse
          }
        )
      case 'li':
        return (
          {
            height: '100%',
            textAlign: 'center',
            display: 'flex',
            flexGrow: '1',
            flexFlow: 'row',
            height: '34px'
          }
        )
      case 'ul-li':
        return (
          {
            listStyle: 'none',
            background: '#303030',
            ':hover': {
              background: '#404040'
            },
          }
        )
    }
  }

  render() {
    let button = this.props.name
               ? this.props.name.toUpperCase()
               : this.props.target.toUpperCase()
    ;
    let missedMessages = this.props.name && Meteor.user().profile.missedMessages
                       ? <a key="missedA" style={this.getCSS('missedA')} href="/teamchat">{`${Meteor.user().profile.missedMessages}!`}</a>
                       : ""
    ;
    return (
      <li style={this.getCSS('li')} className='napDropDownLi'>
        <Style
          scopeSelector='.napDropDownLi:hover > div'
          rules={{
              display: 'flex'
          }}
        />
        <Style
          scopeSelector='.ulHidden'
          rules={{
            position: 'absolute',
            zIndex: '1',
            display: 'none',
            width: '200px',
            flexFlow: 'column',
            marginTop: '34px',
            marginLeft: '-65px'
          }}
        />
        <a key="dropA" style={this.getCSS('a')} href="">
          {button}
        </a>
        {missedMessages}
        <div className='ulHidden'>
          <ul>
           {this.props.sites.map((data, index) => {
               return (
                   <li key={index} style={this.getCSS('ul-li')}>
                       <a style={{textDecoration: 'none'}} href={data.link}>{data.name}</a>
                   </li>
               )
           })}
          </ul>
        </div>
      </li>
    )
  }
}
export default NavDropdown = Radium(NavDropdown);
