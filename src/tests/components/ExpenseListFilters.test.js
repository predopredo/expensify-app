// NPM MODULES
import moment from 'moment';
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
// FIXTURES
import { filters, altFilters } from '../fixtures/filters';

//*** GLOBALS ***
let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy, wrapper

//*** SETTING UP TESTS ***
beforeEach(() => {
  setTextFilterSpy = jest.fn();
  sortByAmountSpy = jest.fn();
  sortByDateSpy = jest.fn();
  setStartDateSpy = jest.fn();
  setEndDateSpy = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilterSpy}
      sortByAmount={sortByAmountSpy}
      sortByDate={sortByDateSpy}
      setStartDate={setStartDateSpy}
      setEndDate={setEndDateSpy}
    />)
});

//*** RENDERING ***
test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

//*** METHODS ***
//setTextFilter
test('should handle text change', () => {
  const value = 'rent';
  wrapper.find('input').simulate('change', {
    target: {
      value
    }
  });
  expect(setTextFilterSpy).toHaveBeenLastCalledWith(value);
});

//DateRangePicker onDatesChanges
test('should handle date changes', () => {
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
  expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate);
  expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate);
});

//DateRangePicker onFocusChange
test('should handle date focus changes to start date', () => {
  const calendarFocused = 'startDate'
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
  expect(wrapper.find('withStyles(DateRangePicker)').prop('focusedInput')).toBe(calendarFocused);
  expect(wrapper).toMatchSnapshot();
});

test('should handle date focus changes to end date', () => {
  const calendarFocused = 'endDate'
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
  expect(wrapper.find('withStyles(DateRangePicker)').prop('focusedInput')).toBe(calendarFocused);
  expect(wrapper).toMatchSnapshot();
});

test('should handle date focus changes to not focused', () => {
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(null);
  expect(wrapper.state('calendarFocused')).toBe(null);
  expect(wrapper.find('withStyles(DateRangePicker)').prop('focusedInput')).toBe(null);
  expect(wrapper).toMatchSnapshot();
});

//*** SORT BY ***
test('should sort by date', () => {
  const value = 'date';
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find('select').simulate('change', {
    target: {
      value
    }
  });
  expect(sortByDateSpy).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: {
      value
    }
  });
  expect(sortByAmountSpy).toHaveBeenCalled();
});