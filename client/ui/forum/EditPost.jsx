import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EditNews extends TrackerReact(Component) {

  componentWillMount() {
    this.state = {
        subscription: {
            post: Meteor.subscribe('onePost', this.props.id)
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

  updateForumPost(event) {
    event.preventDefault();
    console.log(this);
    Meteor.call('updateForumPost', this.props.id, this.refs.postContent.value.trim());
  }

  getPost() {
    return ForumPosts.findOne({_id: this.props.id});
  }

  render() {
    if (!this.state.subscription.post.ready()) {
      return (<div>Loading...</div>);
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
          <form onSubmit={this.updateForumPost.bind(this)}>
            <textarea id="edit" name="content" ref="postContent" />
            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
    )
  }
}
