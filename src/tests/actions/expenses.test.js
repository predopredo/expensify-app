// NPM MODULES
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// Actions
import {
  setExpenses,
  startSetExpenses,
  addExpense,
  startAddExpense,
  removeExpense,
  startRemoveExpense,
  editExpense,
  startEditExpense
} from '../../actions/expenses';
// Fixtures
import expenses from '../fixtures/expenses';
// Firebase
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);


beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database.ref('expenses').set(expensesData).then(() => {
    done()
  });
});

//***SET_EXPENSES***

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses   //we expect it to be the same as database (as set in beforeEach())
    })

    done();
  });

});

//***ADD EXPENSE***
test('should setup add expense action Object with provided values', () => {
  const action = addExpense(expenses[2]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

//***DATABASE WRITING***
//provided values
test('should add expense to database and store', (done) => {
  const store = createMockStore({});

  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  }

  store.dispatch(startAddExpense(expenseData)).then((ref) => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({ // when this is called, there's an actions on store so the function gets actions[0]
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData) // remember: id is an address. Not part of the written object
    done(); // the test will only be finished after done() is called (if you call it up above). After then makes it asynchronous
  });;

});

//default values
test('should add expense with defaults to database and store', (done) => {

  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then((ref) => { //empty object
    const actions = store.getActions();
    expect(actions[0]).toEqual({ // when this is called, there's an actions on store so the function gets actions[0]
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults) // remember: id is an address. Not part of the written object
    done(); // the test will only be finished after done() is called (if you call it up above). After then makes it asynchronous
  });;

});

//***REMOVE EXPENSE***
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });

});

//*** REMOVE EXPENSE FROM DATABASE ***
test('should remove expense from database and store', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id

  store.dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ // there's an action on the array
        type: 'REMOVE_EXPENSE',
        id
      });
    });

  return database.ref(`expenses/${id}`).once('value').then((snapShot) => {
    expect(snapShot.val()).toBe(null);
    done();
  })

});

//***EDIT EXPENSE***
test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });

});

//*** EDIT EXPENSE FROM DATABASE ***
test('should edit expense from database and store', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id

  const updates = { amount: 21045 }

  store.dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ // there's an action on the array
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
    });

  return database.ref(`expenses/${id}`).once('value').then((snapShot) => {
    expect(snapShot.val().amount).toEqual(updates.amount);
    done();
  })

});