// NPM MODULES
import moment from 'moment';
// REDUCERS
import filtersReducer from '../../reducers/filters';

//*** @@INIT ***

test('should setup default filter values', () => {
  const defaultState = filtersReducer(undefined, { type: '@@INIT' });

  expect(defaultState).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });

});

//*** SET_TEXT_FILTER ***
test('should set text filter', () => {
  const text = 'This is my filter'
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  }

  const newState = filtersReducer(undefined, action );

  expect(newState.text).toBe(text)

});

//*** SORT_BY_AMOUNT ***

test('should set sortBy to amount', () => {
  const newState = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

  expect(newState.sortBy).toBe('amount');
});

//*** SORT_BY_DATE ***

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };

  const action = { type: 'SORT_BY_DATE' };

  const newState = filtersReducer(currentState, action);

  expect(newState.sortBy).toBe('date');
});

//*** SET_START_DATE ***

test('should set start date', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate
  };
  const newState = filtersReducer(undefined, action);

  expect(newState.startDate).toBe(startDate);
});

//*** SET_END_DATE ***

test('should set start date', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate
  };
  const newState = filtersReducer(undefined, action);

  expect(newState.endDate).toBe(endDate);
});