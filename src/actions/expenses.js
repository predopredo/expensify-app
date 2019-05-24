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

// SET_EXPENSES
export const startSetExpenses = () => {
  return (dispatch) => {              //this function has access to dispatch (redux-thunk)
    // needs to add return so you can chain .then on app.js and render stuff
    return database.ref('expenses').once('value').then((snapshot) => {   //reads once from firebase and then...

      const expenses = [];
      snapshot.forEach((childSnapshot) => {            //populates the empty array
        expenses.push({
          id: childSnapshot.key,                       //sets firebase location (key) to id and saves it on redux store
          ...childSnapshot.val()                       //so we can use it for routing
        });

        dispatch(setExpenses(expenses));               //dispatches the populated array with mapped ids
      });
    });

  };
};

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// ADD_EXPENSE

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

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE', // Action type
  expense
});

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      })
  }
}

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch) => {
    return database.ref(`expenses/${id}`).update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      })
  }
};