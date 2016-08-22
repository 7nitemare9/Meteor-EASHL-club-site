import React, { Component } from 'react';
export default class ImageUpload extends Component {
  constructor() {
    super();
    Session.set('deleteHash', "");
    this.apiKey = "test";
    Meteor.call('imgurAccessToken', function setToken(error, token) {
      this.apiKey = token;
    }.bind(this))
  }

  logAndUpdate(data) {
    console.log(data);
    $('#uploadedImage')[0].src = data.link;
  }

  uploadImage(data, fn) {
    this.image = data.target.result;
    $("#uploadedImage")[0].src = this.image;
    Imgur.upload({
      apiKey: `Bearer ${this.apiKey}`,
      image: this.image,
      album: "8Z4IE"
    }, (error, data) => {
      if (error) {
        throw error;
      } else {
        Session.set('deleteHash', data.deletehash);
        $('#delete').show();
        fn(data);
      }
    });
  }

  deleteImage(data) {
    Imgur.delete({
      apiKey: `Bearer ${this.apiKey}`,
      deleteHash: Session.get('deleteHash')
    }, (error, data) => {
      if (error) {
        throw error;
      } else {
        $('#uploadedImage')[0].src = "";
        $('#delete').hide();
      }
    });
  }

  encodeImageFileAsUrl(fn) {
    var file = document.getElementById('inputFileToLoad').files[0];
    if (file) {
      var fileToRead = file;
      var fileReader = new FileReader();

      fileReader.onload = (data) => {this.uploadImage(data, fn)}
    }
    fileReader.readAsDataURL(fileToRead);
  }

  componentDidMount() {
    $("#delete").hide();
  }

  render() {
    return (
      <div>
      Image Upload
        <input id="inputFileToLoad" type="file" onChange={() => {this.encodeImageFileAsUrl(this.props.fn)}} />
        <img id="uploadedImage" src={this.props.image} />
        <button id="delete" onClick={this.deleteImage.bind(this)}><p2>Delete</p2></button>
        <br/>
      </div>
    )
  }
}
