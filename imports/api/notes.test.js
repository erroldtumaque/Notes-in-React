import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', function () {

    const noteOne = {
      _id: 'testid1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Things to Buy',
      body: 'Couch',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      // sets up test database
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert a new note', function() {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      // jest change: toExist -> toBeTruthy
      expect(Notes.findOne({ _id, userId })).toBeTruthy();
    });

    it('should not insert note if not authenticated', function() {
      expect(()=> {
        Meteor.server.methods_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

      // jest change: toNotExist -> toBeFalsy
      expect(Notes.findOne({ _id: noteOne._id})).toBeFalsy();
    });

    it('should not remove note if unauthenticated', function () {
      expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function () {
      expect(() => {
          Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId});
      }).toThrow();
    });

    it('should update note', function () {
      const title = 'This is an updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0); //see if changed
      // jest change: toContain-> toMatchObject
      expect(note).toMatchObject({
        title,
        body: noteOne.body
      });
    });

    it('should throw error if extra updates provided', function () {
      expect(() => {
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title: 'new title', name: 'Errold' }
      ]);
      }).toThrow();
    });

    it('should not update note if user was note creator', function () {
      const title = 'This is an updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testid'
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note).toMatchObject(noteOne);
    });

    it('should not update note if unauthenticated', function () {
      expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function () {
      expect(() => {
          Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId});
      }).toThrow();
    });

    it('should return a users notes', function () {
        const res = Meteor.server.publish_handlers.notes.apply({userId:noteOne.userId});
        const notes = res.fetch();

        expect(notes.length).toBe(1);
        expect(notes[0]).toEqual(noteOne);
    });

    it('should return no notes for user with no notes', function () {
        const res = Meteor.server.publish_handlers.notes.apply({userId: 'testId'});
        const notes = res.fetch();

        expect(notes.length).toBe(0);
    });
  });
}
