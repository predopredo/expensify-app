// NPM MODULES
import React from 'react';
// react-redux
import { connect } from 'react-redux';
// Components
import ExpenseListItem from './ExpenseListItem';
// Selectors
import selectExpenses from '../selectors/expenses'

export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
          props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />
          })
        )
    }
  </div>
);

// When you connect the component to a store, it will automatically re-render when store state changes

const mapStateToProps = (storedState) => { // It automatically re-runs when state changes.
  return {
    expenses: selectExpenses(storedState.expenses, storedState.filters) // applies filters every time filters change
  };
};

export default connect(mapStateToProps)(ExpenseList);
// Connect gets the state of the store provided by the react-redux Provider component (passed down to it's children router which will access components)