import { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { IExpense, IExpenseInput } from '../../types';
import Button from '../ui/Button';
import Input from './Input';

interface Props {
  item?: IExpense;
  onClose: () => void;
  onSubmit: (data: IExpenseInput) => void;
}

const ExpenseForm = ({ item, onClose, onSubmit }: Props) => {
  const [formData, setFormData] = useState({
    amount: {
      value: item ? item.amount.toString().replace('.', ',') : '',
      isValid: true,
    },
    date: {
      value: item ? item.date.toLocaleDateString('en-GB') : '',
      isValid: true,
    },
    title: { value: item ? item.title : '', isValid: true },
  });

  const inputChangeHandler = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { value, isValid: true },
    }));
  };

  const submitHandler = () => {
    const date = formData.date.value.split('/').map((item) => +item);
    const expenseData = {
      amount: +formData.amount.value.replace(',', '.'),
      title: formData.title.value,
      date: new Date(date[2], date[1] - 1, date[0]),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const titleIsValid = expenseData.title.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !titleIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setFormData((prev) => ({
        amount: { value: prev.amount.value, isValid: amountIsValid },
        date: { value: prev.date.value, isValid: dateIsValid },
        title: { value: prev.title.value, isValid: titleIsValid },
      }));
      return;
    }

    onSubmit(expenseData);
  };
  const formInvalid =
    !formData.amount.isValid ||
    !formData.date.isValid ||
    !formData.title.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!formData.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: formData.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!formData.date.isValid}
          textInputConfig={{
            placeholder: 'DD/MM/YYYY',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: formData.date.value,
          }}
        />
      </View>
      <Input
        label="Title"
        invalid={!formData.title.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'title'),
          value: formData.title.value,
        }}
      />
      {formInvalid && <Text style={styles.errorText}>Invalid form data!</Text>}
      <View style={styles.buttons}>
        <Button onPress={onClose} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {item ? 'Update' : 'Add'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: { flex: 1 },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    minWidth: 120,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});

export default ExpenseForm;
