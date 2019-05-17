// NPM MODULES
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS 
import ExpenseListItem from '../../components/ExpenseListItem';
// FIXTURES
import expenses from '../fixtures/expenses';

test('should render ExpenseListItem correctly', () => {
  const wrapper = shallow(<ExpenseListItem key={expenses[0].id} {...expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});