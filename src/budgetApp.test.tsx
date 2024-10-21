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

        expect(newExpenseTitle).toBeInTheDocument();
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
        
        const totalSpentComponent = screen.getByTestId("total-spent");
        const remainingComponent = screen.getByTestId("remaining");

        const totalSpentText = totalSpentComponent?.textContent || ""; 
        const remainingText = remainingComponent?.textContent || ""; 

        const totalSpentMatch = totalSpentText.match(/\$(\d+)/);
        const remainingMatch = remainingText.match(/\$(\d+)/);

        const totalSpentAmount = totalSpentMatch ? totalSpentMatch[1] : null; 
        const remainingAmount = remainingMatch ? remainingMatch[1] : null; 

        if (totalSpentAmount !== null) {
            expect(totalSpentAmount).toBe("50"); 
            // original budget: 2340
            expect(remainingAmount).toBe("2290"); 
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
    });
});