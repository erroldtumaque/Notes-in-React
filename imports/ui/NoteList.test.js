import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import  { NoteList } from './NoteList';

var expectChai = chai.expect;
chai.use(sinonChai);

enzyme.configure({ adapter: new Adapter() });

const notes = [
  {
    _id: 'noteId1',
    title: 'Test title',
    body: '',
    updateAt: 0,
    userId: 'userId1'
  },
  {
    _id: 'noteId2',
    title: '',
    body: 'Something is here.',
    updateAt: 0,
    userId: 'userId2'
  }

];

if (Meteor.isClient) {
  describe('NoteList', function () {
    it('should render NoteListItem for each note', function () {
      const wrapper = mount(<NoteList note={notes}/>);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', function () {
      const wrapper = mount(<NoteList note={[]}/>);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
}
