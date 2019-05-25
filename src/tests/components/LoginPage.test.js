// NPM MODULES
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS
import { LoginPage } from '../../components/LoginPage';

test('should render LoginPage correctly', () => {
  const wrapper = shallow(<LoginPage startLogin={() => { }} />);
  expect(wrapper).toMatchSnapshot();
});


//*** Login ***
test('should call startLogin on button click', () => {
  const startLoinSpy = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLoinSpy} />);
  
  wrapper.find('button').simulate('click')
  expect(startLoinSpy).toHaveBeenCalled();
});