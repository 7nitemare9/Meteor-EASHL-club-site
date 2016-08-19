import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AdmEditClubInfo extends TrackerReact(Component) {

  getClubInfo(id) {
    return ClubInfos.findOne({_id: id});
  }

  componentDidUpdate() {
    $('#edit').froalaEditor({
      height: 300,
      imageUploadURL: '/admin/imageupload',
      imageDefaultWidth: 640,
      imageDefaultAlign: 'center'
    });
    $('#edit').froalaEditor('html.set', this.getClubInfo(this.props.id).text, true);
  }

  onComplete(err, data) {
    if (err) {
      Bert.alert(err, 'warning', 'fa-frown');
    } else {
      Bert.alert('club-info updated', 'success', 'fa-check');
      FlowRouter.go(`/clubinfo/${this.getClubInfo(this.props.id).page}`)
    }
  }

  updateClubInfo(event) {
    event.preventDefault();
    console.log('update club info');
    Meteor.call('updateClubInfo', this.props.id, {
      page: this.refs.page.value.trim(),
      title: this.refs.title.value.trim(),
      text: this.refs.edit.value.trim()
    }, this.onComplete.bind(this));
  }

  render() {
    this.state = {subscription: {clubInfos: Meteor.subscribe('clubInfo')}};

    if (!this.state.subscription.clubInfos.ready()) {
      return (<div>Loading...</div>);
    }

    return (
      <div className="b_main_content">
        <div className="b_box">
          <div className="box">
            <div className="content">
              <p>
                <img src="/assets/blank.jpg" alt=""/>
                <p2>EDIT CLUB INFO</p2>
              </p>
              <div className="adm-content">
                <form onSubmit={this.updateClubInfo.bind(this)} >
                  Page.nr:<input type="text" label="Page" ref="page" defaultValue={this.getClubInfo(this.props.id).page} />
                  Title:<input type="text" ref="title" defaultValue={this.getClubInfo(this.props.id).title} />
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
