// NPM MODULES
import moment from 'moment';
import React from 'react';
// Airbnb date picker:
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

// const now = moment();
// console.log(now.format('MMM Do, YYYY - HH:mm'));

export default class ExpenseForm extends React.Component {

  state = {
    description: this.props.expense ? this.props.expense.description : '',
    note: this.props.expense ? this.props.expense.note : '',
    amount: this.props.expense ? (this.props.expense.amount / 100).toString() : '',
    createdAt: this.props.expense ? moment(this.props.expense.createdAt) : moment(),
    calendarFocused: false,
    error: ''
  };

  onDescriptionChange = (event) => {
    const description = event.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = (event) => {
    const note = event.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = (event) => {
    const amount = event.target.value;
    // As it is a controlled input, the value will be always conditioned to the state so if you condition the user input to only get set as state if it matches a specific regex, anything not matching will simply be ignored and won't get into input value. That can be used as validation
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }))
    }
  };

  // airbnb date picker handlers:
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onDateFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  // Form Submission
  onSubmit = (event) => {
    event.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({ error: 'Please provide description and amount!' }))
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmitToDispatch({
        description: this.state.description,
        amount: parseFloat((this.state.amount * 100).toFixed(0), 10),
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      })
    }

  };

  // Rendering JSX
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          autoFocus
          className="text-input"
          onChange={this.onDescriptionChange}
          placeholder="Description"
          type="text"
          value={this.state.description}
        />
        <input
          className="text-input"
          onChange={this.onAmountChange}
          placeholder="Amount"
          type="text"
          value={this.state.amount}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          displayFormat="DD/MM/YYYY"
          focused={this.state.calendarFocused}
          isOutsideRange={() => false}
          numberOfMonths={1}
          onDateChange={this.onDateChange}
          onFocusChange={this.onDateFocusChange}
        />
        <textarea
          className="textarea"
          onChange={this.onNoteChange}
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
        >
        </textarea>
        <div>
          <button className="button">{this.props.expense ? 'Update' : 'Add Expense'}</button>
        </div>
      </form>
    );
  };
};

