// Npm modules
import React from 'react';
// Actions
import { addExpense } from '../actions/expenses'
// react-redux connect
import { connect } from 'react-redux';
// Components
import ExpenseForm from './ExpenseForm';

export class AddExpensePage extends React.Component {
  onSubmit = (formExpense) => { //*
    this.props.addExpense(formExpense); // ***
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmitToDispatch={this.onSubmit} //*
        />
      </div>
    );
  }
};

// mapDispatchToProps let's you can return an object that somehow uses dispatch
// here we use it to abstract it away from component so this component gets easily testable with spy function
const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense)) // ***
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage);