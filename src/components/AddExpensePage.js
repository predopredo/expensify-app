// Npm modules
import React from 'react';
// Actions
import { addExpense } from '../actions/expenses'
// react-redux connect
import { connect } from 'react-redux';
// Components
import ExpenseForm from './ExpenseForm';

const AddExpensePage = ({ dispatch, history }) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={(formExpense) => {
        dispatch(addExpense({ ...formExpense }));
        history.push('/');
      }}
    />
  </div>
);

export default connect()(AddExpensePage);