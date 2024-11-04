import exp from "constants";
import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, cost, name } = req.body as { id: string, cost: number, name: string };
        if (!name || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, name, cost]);
        res.status(201).send({ id, name, cost });

    } catch (error) {

        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };

}

export async function deleteExpense(req: Request, res: Response, db: Database) {

    const { id } = req.params;

    const out = await db.run("SELECT * from expenses WHERE id=?", [id]); 
    if (out != null) {
        await db.run("DELETE FROM expenses WHERE id=?", [id]);
        return res.status(200).send();
    } else {
        return res.status(400).send({error: "Can't find expense"})
    }

    //const index = expenses.findIndex(expense => expense.id === id);

    //if (index == -1) {
    //    return res.status(404).send({ error: "Expense does not exist" });
    //}

    ///const deletedExpense = expenses.splice(index,1);

    //return res.status(200).send();

}

// export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
//     res.status(200).send({ "data": expenses });
// }

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const expenses = await db.all("SELECT * from expenses")
        res.status(200).send({"data": expenses})

    } catch (error) {

        return res.status(400).send({ error: `Could not get expenses, + ${error}` });

    };
}
