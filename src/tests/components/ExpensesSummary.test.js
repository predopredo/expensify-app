// NPM MODULES
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS
import { ExpensesSummary } from '../../components/ExpensesSummary';
// SELECTORS
import selectExpensesTotal from '../../selectors/expenses-total';
// FIXTURES
import expenses from '../fixtures/expenses';


test('should render ExpensesSummary correctly with no expenses', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={0} expensesTotal={0}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={235}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={23} expensesTotal={23512340987}/>);
  expect(wrapper).toMatchSnapshot();
});