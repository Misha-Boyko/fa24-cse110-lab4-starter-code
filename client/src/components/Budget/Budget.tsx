import React, { useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext"
import { fetchBudget, updateBudget } from "../../utils/budget-utils";
import { useState } from "react";

const Budget = () => {

  const { budget, setBudget } = useContext(AppContext);
  const [ inputB, setInputB ] = useState("");

  // Fetch expenses on component mount
  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load expenses and handle errors
    const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
    };

    const onBudgetSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      updateBudget(inputB as unknown as number); 

      setBudget(inputB as unknown as number); 
    }


  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">

      <form onSubmit={(e) => onBudgetSubmit(e)}>
        <label >Budget: ${budget}</label>
        <input type="text" id="budget" name="budget" value={inputB} onChange={(e) => setInputB(e.target.value)} />
        <button type="submit" value="Submit">Save</ button>
      </form>


    </div>
  );
};

export default Budget;



