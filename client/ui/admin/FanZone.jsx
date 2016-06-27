import React, { Component } from 'react';
import ImageUpload from './ImageUpload.jsx';

export default class AdmFanZone extends Component {

  logImageLink(data) {
    console.log(data.link);
    Meteor.call('insertImage', data.link);
  }

  uploadImage(event) {
    event.preventDefault();
    let videoLink = this.refs.video.value.trim();
    console.log(videoLink);
    if (videoLink) {
      Meteor.call('insertVideo', videoLink);
      this.refs.video.value = "";
    }
  }

  componentDidMount() {
    $('#edit').froalaEditor({
      imageUploadURL: '/admin/imageupload'
    });

  }

  render() {
    return (
      <div><p>FanZone upload</p>
        <ImageUpload fn={this.logImageLink} />
        <br />
        <p>Video Upload</p>
        <form onSubmit={this.uploadImage.bind(this)}>
          <input type="text" ref="video"/>
          <input type="submit" value="Upload" />
          <textarea id="edit" name="content" />
        </form>
      </div>
    )
  }
}
