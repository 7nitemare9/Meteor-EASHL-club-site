import React, { Component } from 'react';

export default class ShoutList extends Component {
  constructor() {
    super();
    this.state = {deleteShout: <td></td>};
  }

  removeShout(shout) {
    Meteor.call('removeShout', shout);
  }

  componentDidMount() {
    if (Roles.userIsInRole(Meteor.user(), ["Admin"])) {
      this.setState({deleteShout:
        <td className="shout-delete-td">
          <a onClick={() => {this.removeShout(data)}}>delete</a>
        </td>}
      );
    }
  }

  render() {
    return (
      <div className="shout-list">
        <table>
          <tbody>
            {this.props.shouts.map((data) => {
              return (
                <tr key={data._id}>
                  <td className="shout-name-td">{` ${data.name}:`}</td>
                  <td className="shout-message-td">{data.message}</td>
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
