import { Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { Period } from '../types';

const AllExpenses = () => {
  return <ExpensesOutput expenses={[]} period={Period.TOTAL} />;
};

export default AllExpenses;
