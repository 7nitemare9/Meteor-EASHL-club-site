import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ForumCategory extends TrackerReact(Component) {

    componentDidUpdate() {
    $('#edit').froalaEditor({
      imageUploadURL: '/admin/imageupload',
      height: 300
    });
    $('#post-form').hide();
  }

  showForm() {
    $('#post-form').show(250);
  }

  getThreads() {
    return ForumThreads.find({category: this.props.name}).fetch();
  }

  getCategory(category) {
    return ForumCategories.findOne({name: category});
  }

  onComplete(err, id) {
    console.log(err, id);
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    }
    Bert.alert('New thread created', 'success', 'fa-check');
    FlowRouter.go(`/forum/thread/${id}`);
  }

  addThread(event) {
    event.preventDefault();
    Meteor.call('addForumThread',
                this.props.name,
                this.refs.title.value,
                this.refs.threadContent.value,
                Meteor.user()._id, this.onComplete.bind(this));
  }

  getUser(userId) {
    return Meteor.users.findOne({_id: userId}).profile.gamertag || Meteor.users.findOne({_id: userId}).profile.name;
  }

  render() {
    this.state = {subscription:
                  {threads: Meteor.subscribe('allThreadsInCategory', this.props.name)}};
    this.state.subscription.category = Meteor.subscribe('allForumCategories');
    this.state.subscription.users = Meteor.subscribe('allUserProfiles');
    if (!this.state.subscription.threads.ready() || !this.state.subscription.category.ready() || !this.state.subscription.users.ready()) {
      return (<div>Loading...</div>)
    }
    if (!Roles.userIsInRole(Meteor.user(), this.getCategory(this.props.name).available_to) && this.getCategory(this.props.name).available_to > 0) {
      return (<div>Access Denied, you don't have permission to this part of the forum</div>)
    }
    let ableToPost = Meteor.user() ? <a href="#" onClick={this.showForm}>Add new thread</a> : <a href="/login">Login / Register</a>;
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="content" style={{marginBottom: "15px"}}>
            <p>
              <img src="/assets/blank.jpg" alt=""/>
              <p2><a href="/forum">FORUM</a>{` - ${this.props.name.toUpperCase()}`}</p2>
            </p>
          </div>
            {this.getThreads().map((thread) => {
              let postData = thread.latestPost != null ?
                    <p style={{marginTop: '10px'}}>
                      {`Last response by ${this.getUser(thread.latestPost.userId)}
                       at ${moment(thread.latestPost.createdAt).format('YY-MM-DD HH:mm')}`}
                    </p> : <div></div>
              return(
                <div className="category">
                  <div className="category-left">
                    <a href={`/forum/thread/${thread._id}`}>{thread.title}</a>
                  </div>
                  <div className="category-right">
                    <p>{`Number of Responses: ${thread.numPosts}`}</p>
                    <p></p>
                    {postData}
                  </div>
                </div>
              )
            })}
            {ableToPost}
            <form id="post-form" onSubmit={this.addThread.bind(this)}>
              <p2>Create New Thread</p2>
              <input type="text" name="title" ref="title" />
              <textarea id="edit" name="content" ref="threadContent" />
              <input type="submit" value="Submit" />
            </form>
        </div>
      </div>
    )
  }
}
