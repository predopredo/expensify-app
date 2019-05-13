// Npm modules
import React from 'react';
// react-redux
import { connect } from 'react-redux';
// actions
import { editExpense, removeExpense } from '../actions/expenses';
// Components
import ExpenseForm from './ExpenseForm';
import NotFoundPage from '../components/NotFoundPage'

const EditExpensePage = ({ expense, dispatch, history }) => {
  return expense ? (
    <div>
      <h1>Edit Expense</h1>
      <ExpenseForm
        expense={expense}
        onSubmit={(FormExpense) => {
          dispatch(editExpense(expense.id, FormExpense));
          history.push('/');
        }}
      />
      {expense && <button onClick={() => {
        dispatch(removeExpense(expense.id));
        history.push('/');
      }
      }>Remove</button>}
    </div>
  ) :
    <div>
      <NotFoundPage />
    </div>
}

const mapStateToProps = (storedState, props) => { // props = EditExpensesPage props
  return {
    expense: storedState.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditExpensePage);