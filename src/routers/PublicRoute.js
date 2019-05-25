// NPM MODULES
import React from 'react'
import { Route, Redirect } from 'react-router-dom';
// connect react-redux
import { connect } from 'react-redux';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest               // rest = variable with the rest of the properties (could be named differently)
}) => (
    <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
          <Component {...props} />
        )
    )} />
  );

const mapStateToProps = (storedState) => ({
  isAuthenticated: !!storedState.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);