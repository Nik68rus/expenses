export interface IExpense {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

export enum Period {
  WEEK = 'Week',
  TOTAL = 'Total',
}
