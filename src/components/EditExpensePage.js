// Npm modules
import React from 'react';
// react-redux
import { connect } from 'react-redux';
// actions
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
// Components
import ExpenseForm from './ExpenseForm';
import NotFoundPage from '../components/NotFoundPage'

export class EditExpensePage extends React.Component {
  render() {
    return this.props.expense ? (
      <div>
        <div className="page-header">
          <div className="content-container page-header--no-button ">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmitToDispatch={(FormExpense) => {
              this.props.startEditExpense(this.props.expense.id, FormExpense);
              this.props.history.push('/');
            }}
          />
          <button
            className="button button--secondary"
            onClick={() => {
              this.props.startRemoveExpense(this.props.expense.id);
              this.props.history.push('/');
            }}>Remove</button>
        </div>
      </div>
    ) :
      <div>
        <NotFoundPage />
      </div>
  }
}
// props = EditExpensesPage props
const mapStateToProps = (storedState, props) => ({
  expense: storedState.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense({ id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);