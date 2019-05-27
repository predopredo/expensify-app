// NPM MODULES
import React from 'react';
// react-redux
import { connect } from 'react-redux';
// Components
import ExpenseListItem from './ExpenseListItem';
// Selectors
import selectExpenses from '../selectors/expenses'

export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        props.expenses.length === 0 ? (
          <div className="list-item list-item--message">
            <span>No expenses</span>
          </div>
        ) : (
            props.expenses.map((expense) => {
              return <ExpenseListItem key={expense.id} {...expense} />
            })
          )
      }
    </div>
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