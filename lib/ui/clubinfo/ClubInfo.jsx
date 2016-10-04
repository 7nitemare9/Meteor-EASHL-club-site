import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PrevNext from './PrevNext.jsx';

export default class ClubInfo extends TrackerReact(Component) {
  constructor() {
    super();
    this.state = {isAdmin: ''};
  }

  getClubInfoPage() {
    return ClubInfos.findOne({page: this.props.page});
  }

  createHTML(text) {
    return {__html: text}
  }

  onComplete(err, data) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    } else {
      Bert.alert('club-info deletet', 'success', 'fa-check');
      FlowRouter.go(`/clubinfo/${this.props.page - 1}`);
    }
  }

  deleteClubInfo() {
    Meteor.call('deleteClubInfo', this.getClubInfoPage()._id, this.onComplete.bind(this));
  }

  componentDidMount() {
    const page = this.getClubInfoPage();
    if (Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      this.setState({isAdmin: <div><a href={`/admin/editclubinfo/${page._id}`} >edit </a><a href="#" onClick={this.deleteClubInfo.bind(this)}> delete</a></div>});
    }
  }

  render() {
    this.state.subscription  = {clubInfo: Meteor.subscribe('clubInfo')};
    if (!this.state.subscription.clubInfo.ready()) {
      return (<div></div>);
    }
    const page = this.getClubInfoPage();
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>{page.title.toUpperCase()}</p2>
              </p>
              <div className="clubinfo" dangerouslySetInnerHTML={this.createHTML(page.text)} ></div>
              {this.state.isAdmin}
              <PrevNext page={this.props.page} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
