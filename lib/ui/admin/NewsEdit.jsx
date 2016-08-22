import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ImageUpload from './ImageUpload.jsx';

export default class AdmNewsEdit extends TrackerReact(Component) {
  constructor() {
    super();
    this.image = "";
  }

  logImageLink(data) {
    console.log(data.link);
    this.image = data.link;
  }

  componentWillMount() {
    this.state = {
        subscription: {
            newsitem: Meteor.subscribe('newsItem', this.props.id)
        }
    };
  }

  updateNews(event) {
    event.preventDefault();
    let title = this.refs.title.value.trim();
    let videoLink = this.refs.video.value.trim();
    let newsText = this.refs.newsText.value.trim();
    Meteor.call('updateNews', this.props.id, {
        title: title,
        image: this.image,
        youtube: videoLink,
        text: newsText
    }, this.onComplete.bind(this));
  }

  onComplete(err, val) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    }
    Bert.alert('News-post updated', 'success', 'fa-check');
    FlowRouter.go('/');
  }

  componentDidUpdate() {
      DocHead.loadScript('https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4/js/froala_editor.pkgd.min.js', (err, data) => {
      if(!err) {
        $('#edit').froalaEditor({
          imageUploadURL: '/admin/imageupload',
          height: 300
        });
        $('#edit').froalaEditor('html.insert', this.getNews(this.props.id).text, true);
      }
    });
  }

  getNews(id) {
    return NewsPosts.findOne({_id: id});
  }

  render() {
    if (!this.state.subscription.newsitem.ready()) {
      return (<div>Loading...</div>);
    }
    if (!Roles.userIsInRole(Meteor.user(), ['Admin', 'News-poster'])) {
      return (<div>Access Denied, you don't have permission to post or edit news</div>);
    }
    let newsPost = this.getNews(this.props.id);
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>Edit news</p2>
              </p>
              <div className="adm-content">
                <br />
                <br />
                <form onSubmit={this.updateNews.bind(this)}>
                  <p2>Title</p2>
                  <input type="text" ref="title" defaultValue={newsPost.title} />
                  <ImageUpload image={newsPost.image} fn={this.logImageLink.bind(this)} />
                  <p2>Video Upload</p2>
                  <input type="text" ref="video" defaultValue={newsPost.youtube}/>
                  <textarea id="edit" name="content" ref="newsText" />
                  <input type="submit" value="Update" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
