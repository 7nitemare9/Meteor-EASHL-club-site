import React, { Component } from 'react';
import Colors from '../commonCSS/colors.js';

export default class ShoutList extends Component {
  constructor() {
    super();
    this.state = {deleteShout: <td></td>};
    this.style = {
      table: {
        border: '0'
      },
      list: {
        height: '200px',
        overflow: 'auto'
      },
      name: {
        paddingLeft: '3px',
        color: Colors.secondary,
        fontSize: 'small'
      },
      message: {
        fontSize: 'small'
      },
      deleteMessage: {
        cursor: 'pointer',
        fontSize: 'xx-small'
      }
    }
  }

  removeShout(shout) {
    Meteor.call('removeShout', shout);
  }

  componentDidMount() {
    if (Roles.userIsInRole(Meteor.user(), ["Admin"])) {
      this.setState({deleteShout:
        <td style={this.style.deleteMessage}>
          <a onClick={() => {this.removeShout(data)}}>delete</a>
        </td>}
      );
    }
  }

  render() {
    return (
      <div style={this.style.list}>
        <table style={this.style.table}>
          <tbody>
            {this.props.shouts.map((data) => {
              return (
                <tr key={data._id}>
                  <td style={this.style.name}>{` ${data.name}:`}</td>
                  <td style={this.style.message}>{data.message}</td>
                  {this.state.deleteShout}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
