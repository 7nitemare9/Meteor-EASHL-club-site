import React, { Component } from 'react';
import ImageUpload from './ImageUpload.jsx';

export default class AdmFanZone extends Component {

  onComplete(err, data) {
    console.log(err, data);
    if (err) {
      Bert.alert(err.error, 'warning', 'fa-frown');
    } else {
      Bert.alert('Media added', 'success', 'fa-check');
      FlowRouter.go('/admin/fanzone');
    }
  }

  logImageLink(data) {
    Meteor.call('insertImage', data.link, this.onComplete.bind(this));
  }

  uploadImage(event) {
    event.preventDefault();
    var videoLink = this.refs.video.value.trim();
    console.log(videoLink);
    if (videoLink) {
      Meteor.call('insertVideo', videoLink, this.onComplete.bind(this));
      this.refs.video.value = "";
    }
  }

  render() {
    if (!Roles.userIsInRole(Meteor.user(), ['Admin'])) {
      return (<div>Access Denied, you don't have permission to add media.</div>);
    }
    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>FanZone Upload</p2>
              </p>
              <div className="adm-content">
                <ImageUpload fn={this.logImageLink} />
                <br />
                Video Upload
                <form onSubmit={this.uploadImage.bind(this)}>
                  <input type="text" ref="video"/>
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
