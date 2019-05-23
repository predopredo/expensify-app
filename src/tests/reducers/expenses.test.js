// FIXTURES
import expenses from '../fixtures/expenses'
// REDUCERS
import expensesReducer from '../../reducers/expenses';

//*** @@INIT ***

test('should setup default state', () => {
  const defaultState = expensesReducer(undefined, { type: '@@INIT' })
  expect(defaultState).toEqual([]);
});

//*** SET_EXPENSES ***
test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  }
  const newState = expensesReducer(expenses, action) // expenses would be the state value (entering value)
  expect(newState).toEqual([expenses[1]]);  // should return only the expense dispatched on action (expenses[1]) (set)
});
//*** ADD_EXPENSE ***

test('should add a new expense', () => {
  const expense = {
    id: '109',
    description: 'Laptop',
    note: '',
    createdAt: 20000,
    amount: 29500
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const newState = expensesReducer(expenses, action)
  expect(newState).toEqual([...expenses, expense]);
});

//*** EDIT_EXPENSE ***

test('should edit an expense', () => {
  const amount = 122000
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: {
      amount
    }
  };
  const newState = expensesReducer(expenses, action);
  expect(newState[1].amount).toBe(amount);
});

test('should not edit expense if expense not found', () => {
  const amount = 110000
  const action = {
    type: 'EDIT_EXPENSE',
    id: -1,
    updates: {
      amount
    }
  };
  const newState = expensesReducer(expenses, action);
  expect(newState).toEqual(expenses);
});

//*** REMOVE_EXPENSE ***

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const newState = expensesReducer(expenses, action);
  expect(newState).toHaveLength(2);
  expect(newState).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const newState = expensesReducer(expenses, action);
  expect(newState).toHaveLength(3);
  expect(newState).toEqual(expenses);
});