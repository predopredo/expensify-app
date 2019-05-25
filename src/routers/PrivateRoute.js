// NPM MODULES
import React from 'react'
import { Route, Redirect } from 'react-router-dom';
// connect react-redux
import { connect } from 'react-redux';
// COMPONENTS
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest               // rest = variable with the rest of the properties (could be named differently)
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

const mapStateToProps = (storedState) => ({
  isAuthenticated: !!storedState.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);