import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Radium from 'radium';
import Modal, { closeStyle } from 'simple-react-modal';

class Content extends TrackerReact(Component) {
  constructor() {
    super();
    Session.set('showModal', false);
    Session.set('modalContent', '');
    this.contentStyle = {
      margin: '0 10px',
      '@media (max-width: 1312px)': {
        order: '-1'
      }
    }
  }

  createHtml(data) {
    return ({__html: data});
  }

  render() {
      return (
              // <div className="b_main_content">
              <div style={this.contentStyle} className="b_img-responsive">
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
export default Content = Radium(Content);
