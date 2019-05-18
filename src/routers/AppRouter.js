// Npm modules
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch> {/* Switch goes through all and stops if there's a match */}
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route path="*" component={NotFoundPage} />{/* will show when no other match is found */}
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;