// NPM MODULES
import React from 'react';
// actions
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
// redux-react connect
import { connect } from 'react-redux';
// Airbnb react-dates
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

export class ExpenseListFilters extends React.Component {

  state = {
    calendarFocused: null
  };

  // 3. the new value gets passed to the value prop here
  onTextChange = (event) => {
    this.props.setTextFilter(event.target.value) // 1. changes the state filter value according with user input
  }

  onSortChange = (event) => {
    event.target.value === 'amount' ? this.props.sortByAmount() : this.props.sortByDate();
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange} />
        <select
          value={this.props.filters.sortBy}
          onChange={this.onSortChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          startDateId={'startDate'}
          endDate={this.props.filters.endDate}
          endDateId={'endDate'}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          displayFormat="DD/MM/YYYY"
          isOutsideRange={() => false}
        />
      </div>
    );
  };
};

// 2 as the value changes on the store, this re-runs and re-renders what needs to be re-rendered
const mapStateToProps = (storeState) => ({ filters: storeState.filters });

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters); // maps store states to props and adds dispatch to ExpenseListFilters