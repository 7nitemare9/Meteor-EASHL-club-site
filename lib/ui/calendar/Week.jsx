import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Week extends TrackerReact(Component) {
  constructor() {
    super();
    this.style = {
      calEventToday: {
        color: Colors.secondary,
        border: '1px solid',
        textAlign: 'center',
        height: '30px',
        width: '40px',
        display: 'inline-table',
        fontSize: '8px',
        fontWeight: 'bold',
        background: `linear-gradient(${Colors.lightGrey}, ${Colors.darkestGrey})`
      },
      calEvent: {
        color: Colors.secondary,
        textAlign: 'center',
        height: '30px',
        width: '40px',
        display: 'inline-table',
        fontSize: '8px',
        fontWeight: 'bold',
        background: `linear-gradient(${Colors.lightGrey}, ${Colors.darkestGrey})`
      },
      calToday: {
        color: Colors.secondary,
        border: '1px solid',
        padding: '2px',
        textAlign: 'right',
        height: '30px',
        width: '40px',
        marginBottom: '2px',
        display: 'inline-block',
        fontSize: '9px',
        fontWeight: 'bold',
        background: `linear-gradient(${Colors.lightGrey}, ${Colors.darkestGrey})`
      },
      calDate: {
        color: Colors.secondary,
        padding: '2px',
        textAlign: 'right',
        height: '30px',
        width: '40px',
        marginBottom: '2px',
        display: 'inline-block',
        fontSize: '9px',
        fontWeight: 'bold',
        background: `linear-gradient(${Colors.lightGrey}, ${Colors.darkestGrey})`
      },
      calWeek: {
        display: 'flex',
        justifyContent: 'space-around'
      }
    }
  }

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
      <div style={this.style.calWeek}>
        {this.props.week.map((day) => {
          let thisday = moment(this.props.month, 'MM-YYYY').date(day).format('YYYY-MM-DD');
          if ( this.hasScheduledEvent(thisday)) {
            let event = this.hasScheduledEvent(thisday);
            if (thisday === today) {
              return (
                <span title={event.description} onClick={() => this.goToEvent(event)} key={`day${day}`} style={this.style.calEventToday}>
                  <img src={`/${event.image}`} />
                  {event.date.substring(event.date.length - 5, event.date.length)}
                </span>
              )
            }
            return (
            <span title={event.description} onClick={() => this.goToEvent(event)} key={`day${day}`} style={this.style.calEvent}>
                <img src={`/${event.image}`} />
                {event.date.substring(event.date.length - 5, event.date.length)}
              </span>
            )
          }
          if ( today === thisday ) {
            return <span key={`day${day}`} style={this.style.calToday}>{day}</span>
          }
          return (
            <span key={`day${day}`} style={this.style.calDate}>{day}</span>
          )
        })}
      </div>
    )
  }
}
