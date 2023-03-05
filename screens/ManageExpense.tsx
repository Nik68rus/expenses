import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/ExpensesContext';
import { IExpenseInput, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

const ManageExpense = ({ navigation, route }: Props) => {
  const itemId = route.params?.itemId;
  const { expenses, deleteExpense, addExpense, updateExpense } =
    useContext(ExpensesContext);
  const currentExpense = expenses.find((exp) => exp.id === itemId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: itemId ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, itemId]);

  const confirmHandler = (data: IExpenseInput) => {
    if (itemId) {
      updateExpense({
        id: itemId,
        ...data,
      });
    } else {
      addExpense(data);
    }
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    deleteExpense(itemId);
    navigation.goBack();
  };

  const closeHandler = () => {
    navigation.goBack();
  };

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
