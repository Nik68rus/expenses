export interface IExpenseInput {
  title: string;
  amount: number;
  date: Date;
}

export interface IExpense extends IExpenseInput {
  id: string;
}

export enum Period {
  WEEK = 'Week',
  TOTAL = 'Total',
}

export type RootStackParamList = {
  ExpensesOverview: undefined;
  ManageExpense: { itemId?: string };
};

export type TButtonMode = 'flat';
