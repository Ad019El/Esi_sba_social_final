import { v4 as uuidv4 } from 'uuid';

export const expense = () => {
  return {
    expense: "",
    expAmount: "",
    id: uuidv4(),
    isEdit: false
  };
};
