import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import NoteListHeader from './NoteListItemHeader';

var expectChai = chai.expect;
chai.use(sinonChai);

enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListHeader', function () {

    it('should call meteorCall on click', function () {
      const spy = sinon.spy();
      const wrapper = mount( <NoteListHeader meteorCall={spy}/> );

      wrapper.find('button').simulate('click');

      expectChai(spy).to.have.been.called.with('notes.insert');
    });
  });
}
