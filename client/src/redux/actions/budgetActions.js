import {
  GET_BUDGET,
  GET_EXPENSES,
  DELETE_EXPENSE,
  TOGGLE_EDIT,
  EDIT_EXPENSE
} from "../types";

export const getBudget = budget => {
  return {
    type: GET_BUDGET,
    payload: budget
  };
};

export const getExpenses = expenses => {
  return {
    type: GET_EXPENSES,
    payload: expenses
  };
};

export const deleteExpense = id => {
  return {
    type: DELETE_EXPENSE,
    id
  };
};

export const toggleEdit = id => {
  return {
    type: TOGGLE_EDIT,
    id
  };
};

export const editExpense = expense => {
  return {
    type: EDIT_EXPENSE,
    payload: expense
  };
};
