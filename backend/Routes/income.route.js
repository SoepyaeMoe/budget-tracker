import { Router } from "express";
import { addIncome, getIncomes, updateIncome, deleteIncome } from "../Controllers/income.controller.js";

const router = Router();

router.post('', addIncome);

router.get('', getIncomes);

router.put('/:id', updateIncome);

router.delete('/:id', deleteIncome);

export default router;