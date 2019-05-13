// NPM MODULES
import React from 'react';
import moment from 'moment';
// react-router
import { Link } from 'react-router-dom';

const ExpenseLitItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>Amount: {amount} <small>- Created At: {moment(createdAt).format('MMM Do, YYYY')}</small></p>
  </div>
);

export default ExpenseLitItem;