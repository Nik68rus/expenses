import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { Period } from '../types';

const RecentExpenses = () => {
  return <ExpensesOutput expenses={[]} period={Period.WEEK} />;
};

export default RecentExpenses;
