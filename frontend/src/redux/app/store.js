import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../incomes/incomeSlice.js";
import expenseReducer from "../expenses/expenseSlice.js";

export const store = configureStore({
    reducer: {
        expenses: expenseReducer,
        incomes: incomeReducer,
    }
}); 