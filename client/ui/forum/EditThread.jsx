import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EditNews extends TrackerReact(Component) {

  componentWillMount() {
    this.state = {
        subscription: {
            post: Meteor.subscribe('oneThread', this.props.id)
        }
    }
  }

  componentDidUpdate() {
    $('#edit').froalaEditor({
      imageUploadURL: '/admin/imageupload',
      height: 300
    })
    $('#edit').froalaEditor('html.insert', this.getPost().message, true);
  }

  componentDidMount() {
    $('#edit').froalaEditor({
      imageUploadURL: '/admin/imageupload',
      height: 300
    })
    $('#edit').froalaEditor('html.insert', this.getPost().message, true);
  }

  onComplete(err, val ) {
    if (err) {
      Bert.alert('Could not edit post', 'warning', 'fa-frown');
    }
    Bert.alert('Post edited', 'success', 'fa-check');
    FlowRouter.go(`/forum/thread/${this.props.id}`);
  }

  updateForumThread(event) {
    event.preventDefault();
    console.log(this.refs.title.value);
    Meteor.call('updateForumThread', this.props.id, this.refs.postContent.value.trim(), this.refs.title.value.trim(), this.onComplete.bind(this));
  }

  getPost() {
    return ForumThreads.findOne({_id: this.props.id});
  }

  render() {
    if (!this.state.subscription.post.ready()) {
      return (<div>Loading...</div>);
    }
    console.log(this.getPost().title);
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="content" style={{marginBottom: "15px"}}>
            <p>
              <img src="/assets/blank.jpg" alt=""/>
              <p2>FORUM</p2>
            </p>
          </div>
          <form onSubmit={this.updateForumThread.bind(this)}>
            <input type="text" name="title" ref="title" defaultValue={this.getPost().title}/>
            <textarea id="edit" name="content" ref="postContent" />
            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
    )
  }
}
