import React, { Component } from 'react';

export default class ShoutList extends Component {

  removeShout(shout) {
    Meteor.call('removeShout', shout);
  }

  render() {
    let deleteShout = (Roles.userIsInRole(Meteor.user(), ["Admin"])) ?
      <td className="shout-delete-td">
        <a onClick={() => {this.removeShout(data)}}>delete</a>
      </td> : <td></td>;

    return (
      <div className="shout-list">
        <table>
          <tbody>
            {this.props.shouts.map((data) => {
              return (
                <tr>
                  <td className="shout-name-td">{` ${data.name}:`}</td>
                  <td className="shout-message-td">{data.message}</td>
                  {deleteShout}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
