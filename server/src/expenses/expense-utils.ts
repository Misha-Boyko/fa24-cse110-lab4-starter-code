import exp from "constants";
import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, name } = req.body;

    if (!name || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        name,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function

    const { id } = req.params;

    const index = expenses.findIndex(expense => expense.id === id);

    if (index == -1) {
        return res.status(404).send({ error: "Expense does not exist" });
    }

    const deletedExpense = expenses.splice(index,1);

    return res.status(200).send();

}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}