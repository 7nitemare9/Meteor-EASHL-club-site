import React, { Component } from 'react';

export default class AdmForumCategory extends Component {

  addCategory(event) {
    event.preventDefault();
    let available_to = [];
    if (this.refs.Admin.checked) {
      available_to.push("Admin");
    }
    if (this.refs.TeamMember.checked) {
      available_to.push("Team-member");
    }
    Meteor.call('addForumCategory', this.refs.category.value, this.refs.description.value, available_to);
  }

  render() {
    return (
      <form onSubmit={this.addCategory.bind(this)}>
      Category:
        <input type="text" ref="category" />
        Description:
        <input type="text" ref="description" />
        Restrict forum to
        Admin:
        <input type="checkbox" ref="Admin" />
        Team-members:
        <input type="checkbox" ref="TeamMember" />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
