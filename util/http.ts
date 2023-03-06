import { IExpense, IExpenseInput } from './../types/index';
import axios from 'axios';

const BACKEND_URL =
  'https://native-expenses-default-rtdb.europe-west1.firebasedatabase.app';

interface ExpenseGetResponse {
  [id: string]: IExpenseInput;
}

export const storeExpense = async (expenseData: IExpenseInput) => {
  const { data } = await axios.post<{ name: string }>(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  return data.name;
};

export const fetchExpenses = async () => {
  const { data } = await axios.get<ExpenseGetResponse>(
    `${BACKEND_URL}/expenses.json`
  );

  const expenses: IExpense[] = [];
  for (const id in data) {
    expenses.push({ id, ...data[id] });
  }

  return expenses;
};

export const updateServerExpense = (id: string, data: IExpenseInput) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, data);
};

export const removeServerExpense = (id: string) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
};
