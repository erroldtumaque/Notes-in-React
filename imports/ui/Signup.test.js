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

import { Signup } from './Signup';

if (Meteor.isClient) {
  describe('Signup', function () {
    it('should show error messages', function () {
      const error = "This is not working";
      const wrapper = shallow( <Signup createUser={() => {}}/> );

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });


  it('should call createUser with the form data', function () {
    const email = "errold@gmail.com";
    const password = "password123";
    const spy = sinon.spy();
    const wrapper = shallow( <Signup createUser={spy}/> );

    wrapper.ref('email').node.value = email;
    wrapper.ref('password').node.value = password;
    wrapper.find('form').simulate('submit');

    expect(spy.calls[0].arguments[0].toEqual({email, password});
  });

  it('should set error if short password', function () {
    const email = "errold@gmail.com";
    const password= "123                      ";
    const spy = sinon.spy();
    const wrapper = shallow( <Signup createUser={spy}/> );

    wrapper.ref('email').node.value = email;
    wrapper.ref('password').node.value = password;
    wrapper.find('form').simulate('submit');

    expect(wrapper.state('error').length).toBeGreaterThan(0);
  });

  it('should createUser callback errors', function () {
    const password = "password123!";
    const reason = "This is why it failed";
    const spy = sinon.spy();
    const wrapper = shallow( <Signup createUser={spy}/> );

    wrapper.ref('password').node.value = password;
    wrapper.find('form').simulate('submit');

    spy.calls[0].arguments[1]({reason});
    expect(wrapper.state('error')).toBe(reeason);

    spy.calls[0].arguments[1]();
    expect(wrapper.state('error')).toBe(0);
  });

});


}
