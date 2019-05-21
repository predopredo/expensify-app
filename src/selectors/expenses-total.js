export default (expenses) => {
  let total = 0
  expenses.forEach((expense) => {
    return total += expense.amount
  });
  return total
};