// Default state:
const expensesReducerDefaultState = [];

// Expenses Reducer
export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {

    case 'SET_EXPENSES':
      return action.expenses

    case 'ADD_EXPENSE':
      return [...state, action.expense];

    case 'REMOVE_EXPENSE':
      return state.filter((expense) => expense.id != action.id); // Only keeps items with id != from provided ((action.id) [when expense.id != action.id returns true]

    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates // get matching id expense and add each property from action.updates
          }
        } else {
          return expense; // if id doesn't match, just add the expense w/o modifying it
        }
      })

    default:
      return state;

  }
};
// ps: on REMOVE_EXPENSE: you can use state.filter(({ id }) => id != action.id) so filter({ id }) /=/ filter((expense) => expense.id ...) you can destructure a property of an object and pass it as the filter parameter to use it in filter condition