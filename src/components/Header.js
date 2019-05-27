// Npm modules
import React from 'react';
import { Link } from 'react-router-dom';
// react-redux connect
import { connect } from 'react-redux';
// logout action
import { startLogout } from '../actions/auth'

export const Header = (props) => (    //named export for testing
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button className="button button--link" onClick={props.startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);