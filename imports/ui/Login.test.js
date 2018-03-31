import { Meteor } from 'meteor/meteor';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import expect from 'expect';
import enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

var expectChai = chai.expect;
chai.use(sinonChai);

enzyme.configure({ adapter: new Adapter() });

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function () {
    it('should show error messages', function () {
      const error = "This is not working";
      const wrapper = shallow( <Login loginWithPassword={() => {}}/> );

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

 //    it('should call loginWithPassword with form data', function () {
 //      const email = "errold@test.com";
 //      const password = "password123";
 //      const spy = sinon.spy();
 //      const wrapper = shallow(
 //        <Login loginWithPassword={spy} />
 // );
 //
 //      wrapper.find('input[name="email"]').value = email;
 //      wrapper.find('input[name="password"]').value = password;
 //       wrapper.find('form').get(0).submit();
 //
 //      expect(spy.calls[0].arguments[0]).toEqual({email});
 //    });

    // it('should call loginWithPassword with callback errors', function () {
    //   const spy = sinon.spy();
    //   const wrapper = mount(<Login loginWithPassword={spy} />);
    //
    //   wrapper.find('form').simulate('submit');

    //   spy.calls[0].arguments[2]({});
    //   expect(wrapper.state('error').length).toNotBe(0);
    //   spy.calls[0].arguments[2]({});
    //   expect(wrapper.state('error').length).toBe(0);
    // });

  });
}
