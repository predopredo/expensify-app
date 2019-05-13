// NPM MODULES
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ***EXPENSE ACTIONS***

// ADD_EXPENSE
const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {} // if the argument doesn't exist, it will destructure an empty object and get the default values above
) => ({
  type: 'ADD_EXPENSE', // Action type
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = (
  { id }
) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// ***FILTERS ACTIONS***

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

// ***EXPENSES REDUCER***

// Expenses default state:
const expensesReducerDefaultState = [];

// Expenses Reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {

    case 'ADD_EXPENSE':
      return [...state, action.expense];

    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id != action.id); // Only keeps items with id != from provided ((action.id) [when expense.id != action.id returns true]

    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates // get matching id expense and add each property from action.updates
          }
        } else {
          return expense; // if id doesn't match, just add the expense w/o modifying it
        }
      })

    default:
      return state;

  }
};
// ps: on REMOVE_EXPENSE: you can use state.filter(({ id }) => id != action.id) so filter({ id }) /=/ filter((expense) => expense.id ...) you can destructure a property of an object and pass it as the filter parameter to use it in filter condition

// ***FILTERS REDUCER***

// Filters default state:
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

// Filters Reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {

    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };

    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };

    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };

    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };

    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };

    default:
      return state;

  }
};

// ***STORE CREATION***

// Combining Reducers:
const store = createStore(
  combineReducers({
    expenses: expensesReducer, // 'sub store' name: reducer managing this 'sub store'
    filters: filtersReducer
  })
);

// ***GET VISIBLE EXPENSES***

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {

    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch

  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    if (sortBy === 'amount') {
      return a.amount > b.amount ? -1 : 1;
    }
  });
};

// ***SUBSCRIPTION TO STATE CHANGES***

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

  console.log(visibleExpenses);
})

// ***DISPATCH ACTION CALLS***

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: 1000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: 0 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());