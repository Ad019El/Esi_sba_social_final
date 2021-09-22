import Axios from "axios";
import React, { useState } from "react";

//Redux
import { connect } from "react-redux";
import { getBudget } from "../../../../redux/actions/budgetActions";

const BudgetForm = ({ getBudget }) => {
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBudget(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budget === "") {
      setError("Must not be empty");
      return;
    }
    Axios.post("http://localhost:5000/budget/plus/", {
      amount: Number(budget),
    })
      .then(() => window.location.reload(false))
      .catch((error) => console.log(error));
  };

  return (
    <div className="budgetForm mt-5">
      <p className="label">Budget</p>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <input
            type="number"
            placeholder="Add your budget..."
            className="input"
            value={budget}
            onChange={handleChange}
          />
          <br />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button">
            Add Budget
          </button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBudget: (budget) => dispatch(getBudget(budget)),
  };
};

export default connect(null, mapDispatchToProps)(BudgetForm);
