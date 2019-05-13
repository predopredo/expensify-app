import { createStore } from 'redux';


// Reducers
// 1. Reducers are pure functions - output depend only on the input (doesn't interact with outer scope)
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {

  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy // do not change state, just use its value and modify it
      };
    case 'DECREMENT':
      return {
        count: state.count - decrementBy
      };
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state
  };
}

const store = createStore(countReducer);

// Subscribe to changes
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Action generators - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

const resettCount = () => ({ type: 'RESET' });

const setCount = ({ count } = {}) => ({
  type: 'SET',
  count
});

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

store.dispatch(resettCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 101 }));