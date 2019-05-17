// NPM MODULES
import React from 'react'; //always import when using JSX
import { shallow } from 'enzyme';
// COMPONENTS
import { ExpenseList } from '../../components/ExpenseList'; // named export(unconnected version of the component), not default
// FIXTURES
import expenses from '../fixtures/expenses';

//*** WITH EXPENSES ***
test('should render ExpenseList with expenses', () => {
  const wrapper = shallow(<ExpenseList expenses={expenses}/>)

  expect(wrapper).toMatchSnapshot();
});

//*** WITHOUT EXPENSES ***
test('should render ExpenseList with no expenses message', () => {
  const wrapper = shallow(<ExpenseList expenses={[]}/>)

  expect(wrapper).toMatchSnapshot();
});