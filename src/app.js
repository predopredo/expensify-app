// Npm Modules
import React from 'react';
import ReactDOM from 'react-dom';
// react-redux Provider
import { Provider } from 'react-redux';
// Router
import AppRouter from './routers/AppRouter';
// Redux store
import configureStore from './store/configureStore';
// Redux actions
import { addExpense } from './actions/expenses';
// Styles
import 'normalize.css/normalize.css'; //resets all css so all browsers get same styling starting point
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 4500 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.querySelector('#app'));