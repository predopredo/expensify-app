// NPM MODULES
import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
// redux-react connect
import { connect } from 'react-redux';
// Selectors
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = (props) => {
  const expenseWord = props.expensesCount === 1 ? 'expense' : 'expenses';
  const formattedTotal = numeral(props.expensesTotal / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{props.expensesCount} </span>{expenseWord} totalling <span>{formattedTotal}</span>.
          <div className="page-header__actions">
            <Link className="button" to="/create">Add Expense</Link>
          </div>
        </h1>
      </div>
    </div>
  );
};

const mapStateToProps = (storedState) => {
  const visibleExpenses = selectExpenses(storedState.expenses, storedState.filters);
  return {
    expensesTotal: selectExpensesTotal(visibleExpenses),
    expensesCount: visibleExpenses.length
  };
};

export default connect(mapStateToProps)(ExpensesSummary); 