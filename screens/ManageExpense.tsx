import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/ui/Button';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/ExpensesContext';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

const ManageExpense = ({ navigation, route }: Props) => {
  const itemId = route.params?.itemId;
  const { expenses, deleteExpense, updateExpense, addExpense } =
    useContext(ExpensesContext);

  const currentExpense = expenses.find((exp) => exp.id === itemId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: itemId ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, itemId]);

  const deleteExpenseHandler = () => {
    deleteExpense(itemId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (itemId) {
      currentExpense.title = 'Updated title';
      updateExpense(currentExpense);
    } else {
      addExpense({ title: 'test', amount: 34, date: new Date() });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button onPress={cancelHandler} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {itemId ? 'Update' : 'Add'}
        </Button>
      </View>
      {itemId && (
        <>
          <Text>{currentExpense.title}</Text>
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    minWidth: 120,
  },
});

export default ManageExpense;
