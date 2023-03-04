import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { IExpense, Period } from '../../types';

interface Props {
  period: Period;
  expenses: IExpense[];
}

const ExpensesSummary = ({ period, expenses }: Props) => {
  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.sum}>${total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});

export default ExpensesSummary;
