// NPM MODULES
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS
import { EditExpensePage } from '../../components/EditExpensePage';
// FIXTURES
import expenses from '../fixtures/expenses';

//*** GLOBALS ***
let editExpenseSpy, removeExpenseSpy, historySpy, wrapper;
const mockExpense = expenses[2];

//*** SETTING UP TESTS ***
beforeEach(() => {
  editExpenseSpy = jest.fn();
  removeExpenseSpy = jest.fn();
  historySpy = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      history={historySpy}
      expense={mockExpense}
      editExpense={editExpenseSpy}
      removeExpense={removeExpenseSpy}
    />
  );
});

//*** RENDERING ***
test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render NotFoundPage when no expense matched in url :id', () => {
  wrapper = shallow(<EditExpensePage editExpense={editExpenseSpy} removeExpense={removeExpenseSpy} />);
  expect(wrapper).toMatchSnapshot();
});

//*** FUNCTION CALLING ***
test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmitToDispatch')(mockExpense);
  expect(editExpenseSpy).toHaveBeenLastCalledWith(mockExpense.id, mockExpense);
  expect(historySpy.push).toHaveBeenLastCalledWith('/')
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click')
  expect(removeExpenseSpy).toHaveBeenLastCalledWith(mockExpense.id);
  expect(historySpy.push).toHaveBeenLastCalledWith('/')
});