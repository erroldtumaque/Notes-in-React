import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser} from './users';

if (Meteor.isServer) {
describe('users', function() {

  it('should allow valid email address', function () {
    const testUser = {
      emails: [
        {
          address: 'test@example.com'
        }
      ]
    };
    const res = validateNewUser(testUser);

    expect(res).toBe(true);
  });

  it('should reject invalid email', function () {
    const testUser = {
      emails: [
        {
          address: 'testexample.com'
        }
      ]
    };

    expect(() => {
      validateNewUser(testUser);
    }).toThrow(); //passes if expects an error to be thrown aka bad email address
  });

});

}
