import { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { ExpensesContext } from '../../store/ExpensesContext';
import { Period } from '../../types';
import { fetchExpenses } from '../../util/http';
import ErrorOverlay from '../ui/ErrorOverlay';
import LoadingOverlay from '../ui/LoadingOverlay';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

interface Props {
  period: Period;
}

const ExpensesOutput = ({ period }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const exps = await fetchExpenses();
        setExpenses(exps);
      } catch (err) {
        setError('Could not fetch expenses!');
      }
      setIsLoading(false);
    };

    getExpenses();
  }, [setExpenses]);

  const today = new Date();
  const recentPeriodStart = new Date(today.setDate(today.getDate() - 7));

  const filteredExpenses =
    period === Period.WEEK
      ? expenses.filter((exp) => new Date(exp.date) > recentPeriodStart)
      : expenses;

  const errorClearHandler = useCallback(() => setError(''), []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error.length && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorClearHandler} />;
  }

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
