import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LastWeek extends TrackerReact(Component) {

  hasScheduledEvent(date) {
    return Schedule.findOne({date: {$regex: date}});
  }

  goToEvent(event) {
    if (Roles.userIsInRole(Meteor.user(), ['Admin', 'Event-scheduler'])) {
      FlowRouter.go(`/event/${event._id}`);
    }
  }

  render() {
    this.state = {subscription: {schedule: Meteor.subscribe('events')}}
    if (!this.state.subscription.schedule.ready()) {
      return (<div>..</div>);
    }
    let today = moment(this.props.today, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return (
      <div>
        {this.props.week.map((day) => {
          let thisday = moment(this.props.month, 'MM-YYYY').date(day).format('YYYY-MM-DD');
          if (day < 20) {
            return <span key={`nm-day${day}`} className="cal-date-other-month">{day}</span>
          }
          if ( this.hasScheduledEvent(thisday)) {
            let event = this.hasScheduledEvent(thisday);
            if (thisday === today) {
              return (
                <span title={event.description} onClick={() => this.goToEvent(event)} key={`day${day}`} className="cal-event-today">
                  <img src={`/${event.image}`} />
                  {event.date.substring(event.date.length - 5, event.date.length)}
                </span>
              )
            }
            return (
              <span title={event.description} onClick={() => this.goToEvent(event)} key={`day${day}`} className="cal-event">
                <img src={`/${event.image}`} />
                {event.date.substring(event.date.length - 5, event.date.length)}
              </span>
            )
          }
          if ( today === thisday ) {
            return <span key={`day${day}`} className="cal-today">{day}</span>
          }
          return (
            <span key={`day${day}`} className="cal-date">{day}</span>
          )
        })}
      </div>
    )
  }
}
