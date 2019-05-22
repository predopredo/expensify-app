// NPM MODULES
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// REDUCERS
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// ***STORE CREATION***

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  // Combining Reducers:
  const store = createStore(
    combineReducers({
      expenses: expensesReducer, // 'sub store' name: reducer managing this 'sub store'
      filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store
};