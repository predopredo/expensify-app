// Higher Order Component (HOC) - A component(HOC) that renders another component(Regular component)
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

// HOC generator
const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share!</p>}
      <WrappedComponent {...props} />{/* gets all key=value(s) passed as props to HOC and pass it down to the child */}
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please log in to view the info</p>
      )}
    </div>
  );
}

// HOC
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info="This are the details" />, document.querySelector('#app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This are the details" />, document.querySelector('#app'));