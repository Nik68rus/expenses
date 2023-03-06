import { createContext, useCallback, useReducer } from 'react';
import { IExpense, IExpenseInput } from '../types';

interface IExpensesContext {
  expenses: IExpense[];
  setExpenses: (exps: IExpense[]) => void;
  addExpense: (expense: IExpense) => void;
  deleteExpense: (id: IExpense['id']) => void;
  updateExpense: (expense: IExpense) => void;
}

export const ExpensesContext = createContext<IExpensesContext>({
  expenses: [],
  setExpenses: (exps: IExpense[]) => {},
  addExpense: (exp: IExpense) => {},
  deleteExpense: (id: IExpense['id']) => {},
  updateExpense: (exp: IExpense) => {},
});

interface Props {
  children: React.ReactNode;
}

enum ActionType {
  SET = 'SET',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

interface SetAction {
  type: ActionType.SET;
  payload: IExpense[];
}
interface AddAction {
  type: ActionType.ADD;
  payload: IExpense;
}

interface DeleteAction {
  type: ActionType.DELETE;
  payload: IExpense['id'];
}

interface UpdateAction {
  type: ActionType.UPDATE;
  payload: IExpense;
}

type Action = SetAction | AddAction | DeleteAction | UpdateAction;

const expensesReducer = (state: IExpense[], action: Action) => {
  switch (action.type) {
    case ActionType.SET: {
      const inverted = action.payload.reverse();
      return inverted;
    }
    case ActionType.ADD:
      return [action.payload, ...state];
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
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  const setExpenses = useCallback(
    (exps: IExpense[]) => {
      dispatch({ type: ActionType.SET, payload: exps });
    },
    [dispatch]
  );
  const addExpense = useCallback((expData: IExpense) => {
    dispatch({ type: ActionType.ADD, payload: expData });
  }, []);
  const deleteExpense = useCallback((id: string) => {
    dispatch({ type: ActionType.DELETE, payload: id });
  }, []);

  const updateExpense = useCallback((updatedExp: IExpense) => {
    dispatch({ type: ActionType.UPDATE, payload: updatedExp });
  }, []);

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        setExpenses,
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
