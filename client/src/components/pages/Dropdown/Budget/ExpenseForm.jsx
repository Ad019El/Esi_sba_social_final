import React, { useState } from "react";
import style from "./expenseForm.module.css";

//Redux
import { connect } from "react-redux";
import { getExpenses, toggleEdit } from '../../../../redux/actions/budgetActions';

const ExpenseForm = props => {
  const [expenses, setExpenses] = useState(props.expense);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  //destructuring expenses
  const { expense, expAmount } = expenses;

  const handleChange = e => {
    setExpenses({
      ...expenses,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (expense === "") {
      setError1("Must not be empty");
    } else {
      setError1("");
    }
    if (expAmount === "") {
      setError2("Must not be empty");
    } else {
      setError2("");
    }

    if (expense === "" || expAmount === "") {
      return;
    }

    setExpenses(props.expense);

    expenses.isEdit === true
      ? props.editExpense(expenses)
      : props.getExpenses(expenses);
  };

  return (
    <div
      className={`${style.budgetForm} ${
        expenses.isEdit === true ? "mt-05" : "mt-5"
      }`}
    >
      <p className="label">Expenses</p>
      <form onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <input
            type="input"
            placeholder="Add your expense..."
            className="input"
            name="expense"
            value={expense}
            onChange={handleChange}
          />
          {error1 && <p className="error">{error1}</p>}
        </div>
        <br/>
        <div className={style.inputGroup}>
          <input
            type="number"
            placeholder="Add your expense amount..."
            name="expAmount"
            className="input"
            value={expAmount}
            onChange={handleChange}
          />
          <br />
          {error2 && <p className="error">{error2}</p>}
          <button type="submit" className="button">
            {expenses.isEdit === true ? "Edit expense" : "Add expense"}
          </button>
          {expenses.isEdit && (
            <button
              className="ml-2 simple-button"
              onClick={() => props.toggleEdit(expenses.id)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    getExpenses: expenses => dispatch(getExpenses(expenses)),
    toggleEdit: id => dispatch(toggleEdit(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ExpenseForm);
