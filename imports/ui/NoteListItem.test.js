import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import NoteListItem from './NoteListItem';

var expectChai = chai.expect;
chai.use(sinonChai);

enzyme.configure({ adapter: new Adapter() });
import { PrivateHeader } from './PrivateHeader';

if (Meteor.isClient) {
  describe('NoteListItem', function () {

    it('should render title and timestamp', function () {
      const title = 'My title here';
      const updateAt = 1522461966128;
      const wrapper = mount(<NoteListItem note=({title, updatedAt})/>);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('3/03/3018');
    });

    it('should set default title if no title set', function () {
      const title = '';
      const updatedAt = 1522461966128;
      const wrapper = mount(<NoteListItem note=({title, updatedAt})/>);

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });
  });
}
