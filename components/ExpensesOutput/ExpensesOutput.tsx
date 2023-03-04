import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { ExpensesContext } from '../../store/ExpensesContext';
import { Period } from '../../types';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

interface Props {
  period: Period;
}

const ExpensesOutput = ({ period }: Props) => {
  const { expenses } = useContext(ExpensesContext);

  const today = new Date();
  const recentPeriodStart = new Date(today.setDate(today.getDate() - 7));

  const filteredExpenses =
    period === Period.WEEK
      ? expenses.filter((exp) => exp.date > recentPeriodStart)
      : expenses;

  return (
    <View style={styles.container}>
      <ExpensesSummary period={period} expenses={filteredExpenses} />
      {filteredExpenses.length ? (
        <ExpensesList items={filteredExpenses} />
      ) : (
        <Text style={styles.infoText}>Nothing here yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 42,
  },
});

export default ExpensesOutput;
