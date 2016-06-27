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

  uploadNews(event) {
    event.preventDefault();
    let title = this.refs.title.value.trim();
    console.log(title);
    let videoLink = this.refs.video.value.trim();
    console.log(videoLink);
    let newsText = this.refs.newsText.value.trim();
    console.log(newsText);
    console.log(this.image);
    Meteor.call('addNews', {title: title,
                            image: this.image,
                            youtube: videoLink,
                            text: newsText});
  }

  componentDidMount() {
    $('#edit').froalaEditor({
      imageUploadURL: '/admin/imageupload',
      height: 300
    });

  }

  render() {
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>Add News</p2>
              </p>
              <div style={{margin: "10px"}}>
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
