// NPM MODULES
import React from 'react';
// react-redux connect
import { connect } from 'react-redux';
// log in action
import { startLogin } from '../actions/auth';


export const LoginPage = (props) => (    //named export for testing
  <div>
    <button
      onClick={props.startLogin}
    >
      Login
    </button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage);