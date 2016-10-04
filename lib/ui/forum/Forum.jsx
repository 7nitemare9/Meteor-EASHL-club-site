import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Forum extends TrackerReact(Component) {

  constructor() {
    super();
    this.state = {subscription:
                 {categories: Meteor.subscribe('allForumCategories')},
                  isClient: false};
  }

  getCategories() {
    return ForumCategories.find().fetch();
  }

  componentDidMount() {
    this.setState({isClient: true});
  }

  render() {
    if (!this.state.subscription.categories.ready()) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="content" style={{marginBottom: "15px"}}>
            <p>
              <img src="/assets/blank.jpg" alt=""/>
              <p2>FORUM</p2>
            </p>
          </div>
            {this.getCategories().map((category) => {
              let thread = category.LatestActiveThread != null ?
                <a href={`/forum/thread/${category.LatestActiveThread._id}`}>
                  {category.LatestActiveThread.title}
                </a> : <p></p>;
              if ((!Roles.userIsInRole(Meteor.user(), category.available_to) && category.available_to.length > 0) || !this.state.isClient) {
                return (<p key={category._id}></p>)
              }
              return(
                <div key={category._id} className="category">
                  <div className="category-left">
                    <a href={`/forum/${category.name}`}>{category.name}</a>
                    <p>{category.description}</p>
                  </div>
                  <div className="category-right">
                    <p>{`Number of Threads: ${category.numThreads}`}</p>
                    {thread}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
