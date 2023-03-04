import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { IExpense, RootStackParamList } from '../../types';

interface Props {
  item: IExpense;
}

type ManageExpenseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ManageExpense'
>;

const ExpenseItem = ({ item }: Props) => {
  const navigation = useNavigation<ManageExpenseScreenNavigationProp>();

  const expensePressHandler = () => {
    navigation.navigate('ManageExpense', { itemId: item.id });
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{item.title}</Text>
          <Text style={styles.textBase}>
            {item.date.toLocaleDateString('en-GB')}
          </Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{item.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  pressed: {
    opacity: 0.5,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});

export default ExpenseItem;
