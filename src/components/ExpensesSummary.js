// NPM MODULES
import React from 'react';
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
    <div>
      <h1>
        Viewing {props.expensesCount} {expenseWord} totalling {formattedTotal}
      </h1>
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