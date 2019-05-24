// Npm Modules
import React from 'react';
import ReactDOM from 'react-dom';
// react-redux Provider
import { Provider } from 'react-redux';
// Router
import AppRouter from './routers/AppRouter';
// Redux store
import configureStore from './store/configureStore';
// Styles
import 'normalize.css/normalize.css'; //resets all css so all browsers get same styling starting point
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
// Firebase
import './firebase/firebase';
// Set expenses from database
import {startSetExpenses} from './actions/expenses';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const loading = (
  <div>
    <h1>Expensify</h1>
    <p>Loading...</p>
  </div>
);

ReactDOM.render(loading, document.querySelector('#app'));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.querySelector('#app'));
});