import { render, screen, fireEvent } from "@testing-library/react";
import {MyBudgetTracker} from "./views/MyBudgetTracker"
import App from "./App";

describe("Create Expense", () => {
    test("adds a new expense to list", () => {
        render(<App />);

        const createExpenseTitleInput = screen.getByPlaceholderText("input a name");
        const createCostInput = screen.getByPlaceholderText("input a cost");
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(createExpenseTitleInput, { target: { value: "Surfboard" } });
        fireEvent.change(createCostInput, {
            target: { value: 50 },
        });
        fireEvent.click(createExpenseButton);

        fireEvent.change(createExpenseTitleInput, { target: { value: "car" } });
        fireEvent.change(createCostInput, {
            target: { value: 500 },
        });

        const newExpenseTitle = screen.getByTestId("Surfboard");
        const newCostContent = screen.getByTestId(50);

        expect("test").toBeInTheDocument();
        expect(newCostContent).toBeInTheDocument();
    });

    test("Verify remaining and total spent update", () => {
        render(<App />);

        const createExpenseTitleInput = screen.getByPlaceholderText("input a name");
        const createCostInput = screen.getByPlaceholderText("input a cost");
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(createExpenseTitleInput, { target: { value: "Surfboard" } });
        fireEvent.change(createCostInput, {
            target: { value: 50 },
        });
        fireEvent.click(createExpenseButton);

        fireEvent.change(createExpenseTitleInput, { target: { value: "car" } });
        fireEvent.change(createCostInput, {
            target: { value: 500 },
        });

        const rem = screen.getByText("Remaining: $2290")
        const spent = screen.getByText("Spent so far: $50")
        expect(rem).toBeInTheDocument();
        expect(spent).toBeInTheDocument();
    });
});


describe("Delete Expense", () => {
    test("Check removal for deleted expense", () => {
        render(<App />);

        const createExpenseTitleInput = screen.getByPlaceholderText("input a name");
        const createCostInput = screen.getByPlaceholderText("input a cost");
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(createExpenseTitleInput, { target: { value: "Surfboard" } });
        fireEvent.change(createCostInput, {
            target: { value: 50 },
        });
        fireEvent.click(createExpenseButton);

        const deleteExpenseButton = screen.getByTestId("Surfboard-delete");
        fireEvent.click(deleteExpenseButton);

        const deletedExpenseTitle = screen.queryByText("Surfboard");
        const deletedExpenseCost = screen.queryByText("50");

        expect(deletedExpenseTitle).toBeNull();
        expect(deletedExpenseCost).toBeNull();
    });

    test("Check total-Spent and Remaining after deletion", () => {
        render(<App />);

        // Add element and check total-spent and remaining
        const createExpenseTitleInput = screen.getByPlaceholderText("input a name");
        const createCostInput = screen.getByPlaceholderText("input a cost");
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(createExpenseTitleInput, { target: { value: "Surfboard" } });
        fireEvent.change(createCostInput, {
            target: { value: 50 },
        });
        fireEvent.click(createExpenseButton);

        let totalSpentComponent = screen.getByTestId("total-spent");
        let remainingComponent = screen.getByTestId("remaining");

        let totalSpentText = totalSpentComponent?.textContent || ""; 
        let remainingText = remainingComponent?.textContent || ""; 

        let totalSpentMatch = totalSpentText.match(/\$(\d+)/);
        let remainingMatch = remainingText.match(/\$(\d+)/);

        let totalSpentAmount = totalSpentMatch ? totalSpentMatch[1] : null; 
        let remainingAmount = remainingMatch ? remainingMatch[1] : null; 

        if (totalSpentAmount !== null) {
            expect(totalSpentAmount).toBe("50"); 
            // original budget: 2340
            expect(remainingAmount).toBe("2290"); 
        }

        const deleteExpenseButton = screen.getByTestId("Surfboard-delete");
        fireEvent.click(deleteExpenseButton);


        totalSpentComponent = screen.getByTestId("total-spent");
        remainingComponent = screen.getByTestId("remaining");

        totalSpentText = totalSpentComponent?.textContent || ""; 
        remainingText = remainingComponent?.textContent || ""; 

        totalSpentMatch = totalSpentText.match(/\$(\d+)/);
        remainingMatch = remainingText.match(/\$(\d+)/);

        totalSpentAmount = totalSpentMatch ? totalSpentMatch[1] : null; 
        remainingAmount = remainingMatch ? remainingMatch[1] : null; 

        if (totalSpentAmount !== null) {
            expect(totalSpentAmount).toBe("0"); 
            // original budget: 2340
            expect(remainingAmount).toBe("2340"); 
        }


    });

});


describe("Balance Verification", () => {
    test("adds multiple expenses to list and check rem+spent=budget", () => {
        render(<App />);

        const createExpenseTitleInput = screen.getByPlaceholderText("input a name");
        const createCostInput = screen.getByPlaceholderText("input a cost");
        const createExpenseButton = screen.getByText("Save");

        fireEvent.change(createExpenseTitleInput, { target: { value: "Surfboard" } });
        fireEvent.change(createCostInput, {
            target: { value: 50 },
        });
        fireEvent.click(createExpenseButton);

        const totalSpent = screen.getByText(/Remaining:/)
        const resultSpent = totalSpent.textContent.match(/\d+/);
        const totalRem = screen.getByText(/Spent so far:/)
        const resultRem = totalRem.textContent.match(/\d+/);
        const sum = parseInt(resultSpent[0])+parseInt(resultRem[0])
        expect(sum).toBe(2340)

        const deleteExpenseButton = screen.getByTestId("Surfboard-delete");
        fireEvent.click(deleteExpenseButton);

        const deletedExpenseTitle = screen.queryByText("Surfboard");
        const deletedExpenseCost = screen.queryByText("50");

        const totalSpent2 = screen.getByText(/Remaining:/)
        const resultSpent2 = totalSpent2.textContent.match(/\d+/);
        const totalRem2 = screen.getByText(/Spent so far:/)
        const resultRem2 = totalRem2.textContent.match(/\d+/);
        const sum2 = parseInt(resultSpent2[0])+parseInt(resultRem2[0])
        expect(sum2).toBe(2340)
    });
});