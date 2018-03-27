import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

var expectChai = chai.expect;
chai.use(sinonChai);

enzyme.configure({ adapter: new Adapter() });
import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> );
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function () {
      const title = 'Test title here';

      const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> );
      const actualTitle = wrapper.find('h1').text();

      expect(actualTitle).toBe(title);
    });

    it('should handleLogout onclick', function () {
      const spy = sinon.spy();

      const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/> );

      wrapper.find('button').simulate('click');

      expectChai(spy).to.have.been.called;
    });
  });
}
