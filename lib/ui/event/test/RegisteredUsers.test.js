import React from 'react';
import { shallow } from 'enzyme';
import StubCollections from 'meteor/hwillson:stub-collections';
import { chai } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import RegisteredUsers from '../RegisteredUsers.jsx';

describe('RegisteredUsers', () => {
  describe('should render user names and un-register links when supplied with users', () => {
    it('should render user names', () => {
      if (Meteor.isServer) {return true};

      const event = {registered: ['Us3r-1D', '2ndU5er']};
      sinon.stub(Meteor, 'subscribe', () => ({
        subscriptionId: 0,
        ready: () => true
      }));
      sinon.stub(Meteor, 'user', () => ({_id: 'not-signed-up'}));
      StubCollections.stub([Meteor.users]);
      Meteor.users.insert({_id: 'Us3r-1D', profile: {gamertag: 'tag-gamer', name: 'John Doe'}});
      Meteor.users.insert({_id: '2ndU5er', profile: {gamertag: '', name: 'Jane Doe'}});

      const item = shallow(<RegisteredUsers event={event}/>);
      expect(item.contains(<p3>tag-gamer</p3>)).to.equal(true);
      expect(item.contains(<p3>Jane Doe</p3>)).to.equal(true);
    });

    it('should render unregister link if user is current user', () => {
      if (Meteor.isServer) {return true};

      const event = {registered: ['Us3r-1D', '2ndU5er']};
      Meteor.user.restore(); // Restoring so we can re-stub it
      sinon.stub(Meteor, 'user', () => ({_id: 'Us3r-1D'}));
      StubCollections.stub([Meteor.users]);
      Meteor.users.insert({_id: 'Us3r-1D', profile: {gamertag: 'tag-gamer', name: 'John Doe'}});
      Meteor.users.insert({_id: '2ndU5er', profile: {gamertag: '', name: 'Jane Doe'}});

      const item = shallow(<RegisteredUsers event={event}/>);
      expect(item.contains(<p3>tag-gamer</p3>)).to.equal(true);
      expect(item.find('a').node.props.children).to.equal('unregister');
    });

    it('should render div with "Loading..." in it if subscription not ready', () => {
      if (Meteor.isServer) {return true};

      const event = {registered: ['Us3r-1D']};
      Meteor.subscribe.restore();
      sinon.stub(Meteor, 'subscribe', () => ({
        subscriptionId: 0,
        ready: () => false
      }));
      const item = shallow(<RegisteredUsers event={event}/>);
      expect(item.contains(<div>Loading...</div>)).to.equal(true);
    });
  });

  describe('if you click on unregister it should call a function to remove user from event', () => {
    it('should register click event and run correct function', () => {
      if (Meteor.isServer) { return true };
      const event = {registered: ['Us3r-1D']};
      sinon.stub(RegisteredUsers.prototype, 'unRegister');
      Meteor.subscribe.restore();
      sinon.stub(Meteor, 'subscribe', () => ({
        subscriptionId: 0,
        ready: () => true
      }));
      const item = shallow(<RegisteredUsers event={event} />);
      item.find('a').simulate('click');
      expect(RegisteredUsers.prototype.unRegister.calledOnce).to.equal(true);
    });
  });

  describe('unRegister should call Meteor method unRegisterFromEvent', () => {
    it('should call unRegisterFromEvent', () => {
      if (Meteor.isServer) { return true };
      RegisteredUsers.prototype.unRegister.restore();
      const event = {preventDefault: () => true};
      sinon.stub(Meteor, 'call').returns(true);
      let registeredUsers = new RegisteredUsers();
      registeredUsers.props = {event: {_id: 1}};
      registeredUsers.unRegister(event);
      expect(Meteor.call.calledWith('unRegisterFromEvent', 1)).to.equal(true);
    });
  });

  describe('onComplete shows error or succes messages and routes to event', () => {
    it('should call Bert.alert with error when there was an error', () => {
      if (Meteor.isServer) { return true };
      sinon.stub(Bert, 'alert');
      let registeredUsers = new RegisteredUsers();
      registeredUsers.onComplete('error', null);
      expect(Bert.alert.calledWith('error', 'warning', 'fa-frown')).to.equal(true);
    });
    it('should call Bert.alert with data when there was success and call flow router with route for event', () => {
      if (Meteor.isServer) { return true };
      sinon.stub(FlowRouter, 'go');
      let registeredUsers = new RegisteredUsers();
      registeredUsers.props = {event: {_id: 'test'}};
      registeredUsers.onComplete(null, 'success');
      expect(Bert.alert.calledWith('success', 'success', 'fa-check'));
      expect(FlowRouter.go.calledWith('/event/test'));
      Bert.alert.restore();
      FlowRouter.go.restore();
      Meteor.call.restore();
      Meteor.subscribe.restore();
      Meteor.user.restore();
      StubCollections.restore();
    });
  });
});
