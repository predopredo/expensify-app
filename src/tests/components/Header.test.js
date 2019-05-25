// NPM MODULES
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS
import { Header } from '../../components/Header';


//*** RENDERING ***/
test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => { }} />);
  expect(wrapper).toMatchSnapshot();
});


//*** Logout ***
test('should call startLogout on button click', () => {
  const startLogoutSpy = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogoutSpy} />);

  wrapper.find('button').simulate('click')
  expect(startLogoutSpy).toHaveBeenCalled();
});