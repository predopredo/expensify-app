// NPM MODULES
import moment from 'moment'
import React from 'react';
import { shallow } from 'enzyme';
// COMPONENTS
import ExpenseForm from '../../components/ExpenseForm';
// FIXTURES
import expenses from '../fixtures/expenses'

//*** RENDERING ***
test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

//*** RENDERING WITH EXPENSE DATA (EDIT) ***
test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
  expect(wrapper).toMatchSnapshot();
});

//*** RENDERING ERROR MESSAGE ***
test('should render error for invalid submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('Please provide description and amount!');
  expect(wrapper).toMatchSnapshot();
});

//*** DESCRIPTION INPUT ***
test('should set description on input change', () => {
  const value = 'New description'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', { // at[0] is the first input (it forms an array of same element time occurrences)
    target: {
      value
    }
  });
  expect(wrapper.state('description')).toBe(value);
});

//*** AMOUNT INPUT ***
test('should set amount if valid input change', () => {
  const value = '23.50'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', { // at[1] is the second input (it forms an array of same element time occurrences)
    target: {
      value
    }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input change', () => {
  const value = '12.122'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', { // at[1] is the second input (it forms an array of same element time occurrences)
    target: {
      value
    }
  });
  expect(wrapper.state('amount')).toBe('');
});

//*** NOTE TEXTAREA ***
test('should set note on textarea change', () => {
  const value = 'New note value'
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', { // at[0] is the first input (it forms an array of same element time occurrences)
    target: {
      value
    }
  });
  expect(wrapper.state('note')).toBe(value);
});

//*** FORM SUBMISSION ***

test('should call onSubmitToDispatch prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmitToDispatch={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  const { description, amount, createdAt, note } = expenses[0]

  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description,
    amount,
    createdAt,
    note
  });
});

//*** DATE SETTING ***

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now); //if not working try checking a snapshot to locate your child component
  expect(wrapper.state('createdAt')).toEqual(now);
});

//*** REACT-DATE FOCUS CHANGE ***

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused}); //if not working try checking a snapshot to locate your child component
  expect(wrapper.state('calendarFocused')).toBe(focused);
});