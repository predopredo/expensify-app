// NPM MODULES
import moment from 'moment';
// ***GET VISIBLE EXPENSES***

export default (expenses, { text, sortBy, startDate, endDate }) => {
  
  return expenses.filter((expense) => {

    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(moment(createdAtMoment, 'day')) : true; //moment compare functions
    const endDateMatch = endDate ? endDate.isSameOrAfter(moment(createdAtMoment, 'day')) : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
   
    return startDateMatch && endDateMatch && textMatch
     
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    if (sortBy === 'amount') {
      return a.amount > b.amount ? -1 : 1;
    }
  });

};