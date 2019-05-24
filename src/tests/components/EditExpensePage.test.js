// NPM MODULES
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS
import { EditExpensePage } from '../../components/EditExpensePage';
// FIXTURES
import expenses from '../fixtures/expenses';

//*** GLOBALS ***
let startEditExpenseSpy, startRemoveExpenseSpy, historySpy, wrapper;
const mockExpense = expenses[2];

//*** SETTING UP TESTS ***
beforeEach(() => {
  startEditExpenseSpy = jest.fn();
  startRemoveExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      history={historySpy}
      expense={mockExpense}
      startEditExpense={startEditExpenseSpy}
      startRemoveExpense={startRemoveExpenseSpy}
    />
  );
});

//*** RENDERING ***
test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render NotFoundPage when no expense matched in url :id', () => {
  wrapper.setProps({
    expense: undefined
  })
  expect(wrapper).toMatchSnapshot();
});

//*** METHODS***

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click')
  expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith(mockExpense.id);
  expect(historySpy.push).toHaveBeenLastCalledWith('/')
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmitToDispatch')(mockExpense);
  expect(startEditExpenseSpy).toHaveBeenLastCalledWith(mockExpense.id, mockExpense);
  expect(historySpy.push).toHaveBeenLastCalledWith('/')
});