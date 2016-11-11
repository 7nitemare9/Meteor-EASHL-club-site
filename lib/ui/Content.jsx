import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal, { closeStyle } from 'simple-react-modal';
import { Session } from '../../server/lib/session.js';

export default class Content extends TrackerReact(Component) {
  constructor() {
    super();
    console.log(Session);
    Session.set('showModal', false);
    Session.set('modalContent', '');
  }

  createHtml(data) {
    return ({__html: data});
  }

  render() {
      return (
              <div className="b_main_content">
                <Modal
                  show={Session.get('showModal')}
                  containerStyle={{width: '600px'}}
                  closeOnOuterClick={true}
                  onClose={() => {Session.set('showModal', false)}}
                  >
                  <a style={closeStyle} onClick={() => {Session.set('showModal', false)}}>X</a>
                  <div dangerouslySetInnerHTML={this.createHtml(Session.get('modalContent'))}></div>
                  </Modal>
                <ReactCSSTransitionGroup
                  transitionName="contentAnim"
                  transitionEnterTimeout={500}
                  transitionAppearTimeout={200}
                  transitionLeaveTimeout={500}
                  transitionAppear={true}
                  style={{background: "#202020"}}
                >
                  <div key={this.props.content.type.name} style={{width: '636px'}}>{this.props.content}</div>
                </ReactCSSTransitionGroup>
          </div>
      )
    }
}
