import { Router } from "express";
import { addExpense, getExpenses, updateExpense, deleteExpense } from "../Controllers/expense.controller.js";

const router = Router();

router.post('', addExpense);

router.get('', getExpenses);

router.put('/:id', updateExpense);

router.delete('/:id', deleteExpense);

export default router;