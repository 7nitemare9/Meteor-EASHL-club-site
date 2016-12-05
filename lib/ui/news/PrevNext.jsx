import React, { Component } from 'react';
import Radium from 'radium';
import Colors from '../commonCSS/colors.js';

class PrevNext extends Component {
  constructor() {
    super();
    this.style = {
      centerButtons: {
        width: '100%',
        margin: '20px 7px 0 7px',
        borderTop: '3px solid' + Colors.secondary,
        textAlign: 'center'
      },
      leftButton: {
        background: Colors.grey,
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        border: '0px',
        margin: '5px 0',
        float: 'left',
        boxShadow: '0 2px 6px rgba(0,0,0,0.17), 0 4px 6px rgba(0,0,0,0.23)',
        ':hover': {
          margin: '4px 0',
          width: '26px',
          height: '26px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.17), 0 8px 12px rgba(0,0,0,0.23)'
        }
      },
      rightButton: {
        background: Colors.grey,
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        border: '0px',
        margin: '5px 0',
        float: 'right',
        boxShadow: '0 2px 6px rgba(0,0,0,0.17), 0 4px 6px rgba(0,0,0,0.23)',
        ':hover': {
          margin: '4px 0',
          width: '26px',
          height: '26px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.17), 0 8px 12px rgba(0,0,0,0.23)'
        }
      }
    }
  }

  render() {
    if (this.props.page == 0) {
      return (
        <div style={this.style.centerButtons}>
          <a href={`/news/archive/${parseInt(this.props.page) + 1}`}>
            <div style={this.style.rightButton}><i style={{marginLeft: '2px'}} className="material-icons">chevron_right</i></div>
          </a>
        </div>
      )
    } else {
      return (
        <div style={this.style.centerButtons}>
          <a key="test" href={`/news/archive/${this.props.page - 1}`}>
            <div ref='test5' style={this.style.leftButton}><i className="material-icons">chevron_left</i></div>
          </a>
          <a key="test2" href={`/news/archive/${parseInt(this.props.page) + 1}`}>
              <div key="test6" style={this.style.rightButton}><i style={{marginLeft: '2px'}} className="material-icons">chevron_right</i></div>
          </a>
        </div>
      )
    }
  }
}
export default PrevNext = Radium(PrevNext);