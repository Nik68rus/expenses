import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { Period } from '../types';

const AllExpenses = () => {
  return <ExpensesOutput period={Period.TOTAL} />;
};

export default AllExpenses;
