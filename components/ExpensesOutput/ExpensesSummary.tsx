import { View, Text } from 'react-native';
import { IExpense, Period } from '../../types';

interface Props {
  period: Period;
  expenses: IExpense[];
}

const ExpensesSummary = ({ period, expenses }: Props) => {
  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <View>
      <Text>{period}</Text>
      <Text>${total.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;
