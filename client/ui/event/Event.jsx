import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Event extends TrackerReact(Component) {

  getEvent() {
    return Schedule.findOne({_id: this.props.id});
  }

  deleteEvent() {
    Meteor.call('deleteEvent', this.props.id);
  }

  render() {
    this.state = {subscription: {event: Meteor.subscribe('oneEvent', this.props.id)}}
    if (!this.state.subscription.event.ready()) {
      return (<div>Loading...</div>)
    }
    let links = Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler']) ?
      <div>
        <a href={`/admin/editevent/${this.props.id}`}>edit </a>
        <a href="#" onClick={this.deleteEvent.bind(this)}> delete</a>
      </div> : <div></div>
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
              </p>
              <div>
                <p>{this.getEvent().date}</p>
                <p>{this.getEvent().image}</p>
                {links}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
