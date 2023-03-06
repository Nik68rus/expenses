import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import ErrorOverlay from '../components/ui/ErrorOverlay';
import IconButton from '../components/ui/IconButton';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/ExpensesContext';
import { IExpenseInput, RootStackParamList } from '../types';
import {
  removeServerExpense,
  storeExpense,
  updateServerExpense,
} from '../util/http';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

const ManageExpense = ({ navigation, route }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const itemId = route.params?.itemId;
  const { expenses, deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext);
  const currentExpense = expenses.find((exp) => exp.id === itemId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: itemId ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, itemId]);

  const errorClearHandler = useCallback(() => setError(''), []);

  const confirmHandler = async (data: IExpenseInput) => {
    setIsLoading(true);
    try {
      if (itemId) {
        updateExpense({
          id: itemId,
          ...data,
        });
        await updateServerExpense(itemId, data);
      } else {
        const createdId = await storeExpense(data);
        addExpense({ id: createdId, ...data });
      }
      navigation.goBack();
    } catch (err) {
      setError('Cant finish action! Try later!');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    try {
      await removeServerExpense(itemId);
      deleteExpense(itemId);
      navigation.goBack();
    } catch (err) {
      setError('Cant finish action! Try later!');
      setIsLoading(false);
    }
  };

  const closeHandler = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!isLoading && error.length) {
    return <ErrorOverlay message={error} onConfirm={errorClearHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        item={currentExpense}
        onClose={closeHandler}
        onSubmit={confirmHandler}
      />
      {itemId && (
        <>
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  baseText: {
    color: 'white',
  },
});

export default ManageExpense;
