// NPM MODULES
import moment from 'moment';
// Actions
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters';

//***SET TEXT FILTER***

test('should generate set text filter action object with text value', () => {
  const text = 'Something in';
  const action = setTextFilter(text);

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  })
  
});

test('should generate set text filter action object with default value', () => {
  const action = setTextFilter();

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
  
});

//***SORT BY AMOUNT***

test('should generate sort by amount action object', () => {
  const action = sortByAmount();

  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  })
  
});

//***SORT BY DATE***

test('should generate sort by date action object', () => {
  const action = sortByDate();

  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  })
  
});

//***SET START DATE***

test('should setup set start date action object', () => {
  const startDate = moment(0)
  const action = setStartDate(startDate);

  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate
  })
  
});

//***SET END DATE***

test('should setup set end date action object', () => {
  const endDate = moment(0)
  const action = setEndDate(endDate);

  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate
  })
  
});