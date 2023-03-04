import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { Period } from '../types';

const RecentExpenses = () => {
  return <ExpensesOutput period={Period.WEEK} />;
};

export default RecentExpenses;
