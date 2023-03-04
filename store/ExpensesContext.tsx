import { createContext, useReducer, useState } from 'react';
import { IExpense, IExpenseInput } from '../types';

const DUMMY_EXPENSES: IExpense[] = [
  {
    id: 'e1',
    title: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-03-03'),
  },
  {
    id: 'e2',
    title: 'A book',
    amount: 19.99,
    date: new Date('2023-03-01'),
  },
  {
    id: 'e3',
    title: 'The magazine',
    amount: 9.99,
    date: new Date('2023-02-2'),
  },
  {
    id: 'e4',
    title: 'Theater tickets',
    amount: 19.39,
    date: new Date('2023-01-29'),
  },
  {
    id: 'e5',
    title: 'Shampoo',
    amount: 14.79,
    date: new Date('2023-01-20'),
  },
];

interface IExpensesContext {
  expenses: IExpense[];
  addExpense: (expense: IExpenseInput) => void;
  deleteExpense: (id: IExpense['id']) => void;
  updateExpense: (expense: IExpense) => void;
}

export const ExpensesContext = createContext<IExpensesContext>({
  expenses: [],
  addExpense: (exp: IExpenseInput) => {},
  deleteExpense: (id: IExpense['id']) => {},
  updateExpense: (exp: IExpense) => {},
});

interface Props {
  children: React.ReactNode;
}

enum ActionType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

interface AddAction {
  type: ActionType.ADD;
  payload: IExpenseInput;
}

interface DeleteAction {
  type: ActionType.DELETE;
  payload: IExpense['id'];
}

interface UpdateAction {
  type: ActionType.UPDATE;
  payload: IExpense;
}

type Action = AddAction | DeleteAction | UpdateAction;

const expensesReducer = (state: IExpense[], action: Action) => {
  switch (action.type) {
    case ActionType.ADD:
      return [
        ...state,
        {
          id: new Date().toString() + Math.random().toString,
          ...action.payload,
        },
      ];
    case ActionType.UPDATE:
      return state
        .slice()
        .map((exp) => (exp.id === action.payload.id ? action.payload : exp));
    case ActionType.DELETE:
      return state.slice().filter((exp) => exp.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }: Props) => {
  const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expData: IExpenseInput) => {
    dispatch({ type: ActionType.ADD, payload: expData });
  };
  const deleteExpense = (id: string) => {
    dispatch({ type: ActionType.DELETE, payload: id });
  };

  const updateExpense = (updatedExp: IExpense) => {
    dispatch({ type: ActionType.UPDATE, payload: updatedExp });
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
