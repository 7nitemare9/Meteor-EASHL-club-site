import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AdmClubInfo extends TrackerReact(Component) {

  addClubInfo(event) {
    event.preventDefault();
    Meteor.call('addClubInfo', {
      page: this.refs.page.value.trim(),
      title: this.refs.title.value.trim(),
      text: this.refs.edit.value.trim()
    }, (err, data) => {
      if (err) {
        Bert.alert(err, 'warning', 'fa-frown');
      } else {
        Bert.alert('Club Info added', 'success', 'fa-check');
        this.refs.page.value = "";
        this.refs.title.value = "";
        $("#edit").froalaEditor('html.set', '', true);
      }
    });
  }

  componentDidMount() {
    DocHead.loadScript('https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4/js/froala_editor.pkgd.min.js', (err, data) => {
      if(!err) {
        $('#edit').froalaEditor({
          height: '300px',
          imageUploadURL: '/admin/imageupload',
          imageDefaultWidth: 640,
          imageDefaultAlign: 'center'
        })
      }
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
                <p2>ADD CLUB INFO</p2>
              </p>
              <div className="adm-content">
                <form onSubmit={this.addClubInfo.bind(this)} >
                  Page.nr:<input type="text" label="Page" ref="page" />
                  Title:<input type="text" ref="title" />
                  <textarea id="edit" ref="edit" />
                  <input type="submit" value="submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
