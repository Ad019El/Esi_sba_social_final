import React from "react";

import style from "./expenses.module.css";
import { EditIcon, DeleteIcon } from "../../../../svg/icons";

const Expenses = ({ expense, deleteExpense, toggleEdit }) => {
  return (
    <div className={style.expense}>
      <p>
        Expense: <span> {expense.expense}</span>{" "}
      </p>
      <p>
        Expense Amount: <span className="green">{expense.expAmount}$</span>{" "}
      </p>
      <div className="buttons-container">
        <span
          className="mr-1"
          style={{ cursor: "pointer" }}
          onClick={() => toggleEdit(expense.id)}
        >
          <EditIcon icon="icon icon-green" />
        </span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => deleteExpense(expense.id)}
        >
          <DeleteIcon icon="icon icon-red" />
        </span>
      </div>
    </div>
  );
};

export default Expenses;
