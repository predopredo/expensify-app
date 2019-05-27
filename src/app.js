// Npm Modules
import React from 'react';
import ReactDOM from 'react-dom';
// Firebase
import { firebase } from './firebase/firebase';
// react-redux Provider
import { Provider } from 'react-redux';
// Router and custom history
import AppRouter, { customHistory } from './routers/AppRouter';
// Redux store
import configureStore from './store/configureStore';
// Styles
import 'normalize.css/normalize.css'; //resets all css so all browsers get same styling starting point
import './styles/styles.scss';
// Set expenses from database
import { startSetExpenses } from './actions/expenses';
// Login and Logout actions
import { login, logout } from './actions/auth';
// COMPONENTS 
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.querySelector('#app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.querySelector('#app'));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // calling actions here because store need to be updated even when user reloads
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (customHistory.location.pathname === '/') {
        customHistory.push('/dashboard')
      }
    });
  } else {
    // calling actions here because store need to be updated even when user reloads
    store.dispatch(logout());
    renderApp()
    customHistory.push('/');
  }
});