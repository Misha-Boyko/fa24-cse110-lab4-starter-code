import React, { useState, useContext } from "react";
import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext"

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext)


  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    setExpenses(expenses.filter(item => item.id !== currentExpense.id));
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div data-testid={currentExpense.name}>{currentExpense.name}</div>
      <div data-testid={currentExpense.cost}>${currentExpense.cost}</div>
      <div>
        <button data-testid={currentExpense.name + "-delete"} onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
