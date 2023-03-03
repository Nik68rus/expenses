import { FlatList, ListRenderItemInfo, Text } from 'react-native';
import { IExpense } from '../../types';
import ExpensesSummary from './ExpensesSummary';

interface Props {
  items: IExpense[];
}

const renderExpenseItem = ({ item }: ListRenderItemInfo<IExpense>) => {
  return <Text>{item.title}</Text>;
};

const ExpensesList = ({ items }: Props) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
