import { View } from 'react-native';
import { IExpense, Period } from '../../types';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const DUMMY_EXPENSES: IExpense[] = [
  {
    id: 'e1',
    title: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-03-03'),
  },
  {
    id: 'e2',
    title: 'A book',
    amount: 19.99,
    date: new Date('2023-03-01'),
  },
  {
    id: 'e3',
    title: 'The magazine',
    amount: 9.99,
    date: new Date('2023-02-2'),
  },
  {
    id: 'e4',
    title: 'Theater tickets',
    amount: 19.39,
    date: new Date('2023-01-29'),
  },
  {
    id: 'e5',
    title: 'Shampoo',
    amount: 14.79,
    date: new Date('2023-01-20'),
  },
];

interface Props {
  expenses: IExpense[];
  period: Period;
}

const ExpensesOutput = ({ expenses, period }: Props) => {
  const today = new Date();
  const periodStart = new Date(today.setDate(today.getDate() - 7));

  const filteredExpenses =
    period === Period.WEEK
      ? DUMMY_EXPENSES.filter((exp) => exp.date > periodStart)
      : DUMMY_EXPENSES;

  return (
    <View>
      <ExpensesSummary period={period} expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} />
    </View>
  );
};

export default ExpensesOutput;
