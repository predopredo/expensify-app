// NPM MODULES
import React from 'react';
// actions
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters';
// redux-react connect
import { connect } from 'react-redux';
// Airbnb react-dates
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';

class ExpenseListFilters extends React.Component {

  state = {
    calendarFocused: null
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
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
          onChange={(event) => { // 3. the new value gets passed to the value prop here (optional - in case other element changes the value)
            this.props.dispatch(setTextFilter(event.target.value)) // 1. changes the state filter value according with user input
          }} />
        <select
          value={this.props.filters.sortBy}
          onChange={(event) => {
            event.target.value === 'amount' ? this.props.dispatch(sortByAmount()) : this.props.dispatch(sortByDate())
          }}>
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

const mapStateToProps = (storeState) => { // 2 as the value changes on the store, this re-runs and re-renders what needs to be re-rendered
  return {
    filters: storeState.filters
  };
};

export default connect(mapStateToProps)(ExpenseListFilters); // maps store states to props and adds dispatch to ExpenseListFilters