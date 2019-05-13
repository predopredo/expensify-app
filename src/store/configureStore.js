// NPM MODULES
import { createStore, combineReducers } from 'redux';

// REDUCERS
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// ***STORE CREATION***

export default () => {
  // Combining Reducers:
  const store = createStore(
    combineReducers({
      expenses: expensesReducer, // 'sub store' name: reducer managing this 'sub store'
      filters: filtersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store
};