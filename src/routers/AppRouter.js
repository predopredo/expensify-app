// NPM MODULES
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// COMPONENTS
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import LoginPage from '../components/LoginPage'
import NotFoundPage from '../components/NotFoundPage';
// ROUTERS
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const customHistory = createBrowserHistory();

/* BrowserRouter has history built in. Router doesn't but you can install the history npm module 
(which react BrowserRouter uses behind the scene), use createHistory() and add it as a prop to Router if we export
the customHistory, we can use it in ANY file (even outside the router) to take the user accross the application */

const AppRouter = () => (
  <Router history={customHistory}>
    <div>
      <Switch> {/* Switch goes through all and stops if there's a match */}
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="*" component={NotFoundPage} />{/* will show when no other match is found */}
      </Switch>
    </div>
  </Router>
);

export default AppRouter;