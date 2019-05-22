// NPM MODULES
import uuid from 'uuid'
// FIREBASE DATABASE
import database from '../firebase/firebase';

// NO DB
// component calls action generator
// actions generator returns object
// component dispatches object
// redux store changes

// with DB
// component calls action generator
// actions generator returns function
// component dispatches function (?)
// function runs (has the ability to dispatch other actions and do whatever it wants)

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE', // Action type
  expense
});

// ***only works with redux-thunk wired up (on configureStore.js)***
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData; // //created consts: description, note, amount and createdAt that have default values if no value is passed as argument
    const expense = { description, note, amount, createdAt }; // forms an object with above consts

    return database.ref('expenses').push(expense) // return for testing, won't be used in front-end
      .then((ref) => { // ref = newly added to database expense
        dispatch(addExpense({ // when new expense is written on db, you call dispatch and get id and everything else inside an object to store (and trigger rendering on connected components)
          id: ref.key,
          ...expense // you just get the id from the db, the rest is already on the front-end JS
        }));
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});