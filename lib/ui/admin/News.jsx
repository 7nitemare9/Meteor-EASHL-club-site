import React, { Component } from 'react';
import ImageUpload from './ImageUpload.jsx';

export default class AdmFanZone extends Component {
  constructor() {
    super();
    this.image = "";
  }

  logImageLink(data) {
    console.log(data.link);
    this.image = data.link;
  }

  onComplete(err, val) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    }
    Bert.alert('News-post added', 'success', 'fa-check');
    FlowRouter.go('/');
  }

  uploadNews(event) {
    event.preventDefault();
    let title = this.refs.title.value.trim();
    let videoLink = this.refs.video.value.trim();
    let newsText = this.refs.newsText.value.trim();
    Meteor.call('addNews', {title: title,
                            image: this.image,
                            youtube: videoLink,
                            text: newsText}, this.onComplete.bind(this));
  }

  activateFroala() {
    $('#edit').froalaEditor({
      imageUploadURL: '/admin/imageupload',
      height: 300
    });
  }

  componentDidMount() {
    this.activateFroala();
  }

  componentDidUpdate() {
    this.activateFroala();
  }

  render() {
    if (!Roles.userIsInRole(Meteor.user(), ['Admin', 'News-poster'])) {
      return (<div>Access Denied, you don't have permission to post news.</div>);
    }
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>Add News</p2>
              </p>
              <div className="adm-content">
                <br />
                <br />
                <form onSubmit={this.uploadNews.bind(this)}>
                  <p2>Title</p2>
                  <input type="text" ref="title" />
                  <ImageUpload fn={this.logImageLink.bind(this)} />
                  <p2>Video Upload</p2>
                  <input type="text" ref="video"/>
                  <textarea id="edit" name="content" ref="newsText" />
                  <input type="submit" value="Upload" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
