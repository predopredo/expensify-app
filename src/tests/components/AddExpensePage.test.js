// NPM MODULES
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS
import { AddExpensePage } from '../../components/AddExpensePage';
// FIXTURES
import expenses from '../fixtures/expenses.js'

let addExpenseSpy, historySpy, wrapper;

//*** SETTING UP TESTS ***
beforeEach(() => {
  addExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage addExpense={addExpenseSpy} history={historySpy} />);
})

//*** RENDERING ***
test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

//*** FUNCTION CALLING ***
test('should handle onSubmit', () => {
  wrapper.find('ExpenseForm').prop('onSubmitToDispatch')(expenses[1]);
  expect(historySpy.push).toHaveBeenLastCalledWith('/');
  expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[1]);
});