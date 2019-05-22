// NPM MODULES
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS
import { AddExpensePage } from '../../components/AddExpensePage';
// FIXTURES
import expenses from '../fixtures/expenses.js'

let startAddExpenseSpy, historySpy, wrapper;

//*** SETTING UP TESTS ***
beforeEach(() => {
  startAddExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage startAddExpense={startAddExpenseSpy} history={historySpy} />);
})

//*** RENDERING ***
test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

//*** METHODS ***
test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmitToDispatch')(expenses[1]);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
  expect(startAddExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
});