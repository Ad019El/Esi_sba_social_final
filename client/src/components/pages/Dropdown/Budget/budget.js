import React from "react";
import BudgetForm from "./BudgetForm";
import ViewCalc from "./ViewCalc";
import ProgrammeBudget from "./ProgrammeBudget";
import "./budget.css";
import { Container } from "react-bootstrap";
const Budget = () => {
  return (
    <Container>
      <ViewCalc />
      <BudgetForm />
      <br />
      <ProgrammeBudget />
    </Container>
  );
};

export default Budget;
