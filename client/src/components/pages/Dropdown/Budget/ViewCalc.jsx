import React from "react";
import style from "./viewCalc.module.css";
import Expenses from "./Expenses";
import ExpenseForm from "./ExpenseForm";
import "./Programme.css"

//Redux
import { connect } from "react-redux";
import {
  deleteExpense,
  toggleEdit,
  editExpense,
} from "../../../../redux/actions/budgetActions";
import Axios from "axios";

var info;

Axios.get("http://localhost:5000/sous_chapitres/info").then((result) => {
  info = result.data;
});

const ViewCalc = ({
  expenses,
  budget,
  deleteExpense,
  toggleEdit,
  editExpense,
}) => {
  const totalExpenses = expenses.reduce((a, b) => {
    return parseInt(a) + parseInt(b.expAmount);
  }, 0);

  return (
    <>
      <div className={style.viewCalc}>
        <div>
          <h4>Sold</h4>
          <p className="sold">{info.sold}$</p>
        </div>
        <div>
          <h4>Credit</h4>
          <p className="credit">{info.credit}$</p>
        </div>
        <div>
          <h4>Debit</h4>
          <p className="debit">
            {info.debit}$
          </p>
        </div>
      </div>
      {expenses.map((expense) => {
        return (
          <div key={expense.id}>
            {expense.isEdit === true ? (
              <ExpenseForm expense={expense} editExpense={editExpense} />
            ) : (
              <Expenses
                expense={expense}
                deleteExpense={deleteExpense}
                toggleEdit={toggleEdit}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    budget: state.budget.budget,
    expenses: state.budget.expenses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteExpense: (id) => dispatch(deleteExpense(id)),
    toggleEdit: (id) => dispatch(toggleEdit(id)),
    editExpense: (expense) => dispatch(editExpense(expense)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCalc);
