import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {
        initializeExpenses: (state, action) => {
            state.data = action.payload;
        },
        addExpense: (state, action) => {
            state.data.expenses.unshift(action.payload);
        },
        editExpense: (state, action) => {
            const { _id, category, description, amount, date } = action.payload;
            state.data.expenses = state.data.expenses.map(expense => {
                if (expense._id === _id) {
                    return { ...expense, category, description, amount, date };
                }
                return expense;
            });
        },
        deleteExpense: (state, action) => {
            state.data.expenses = state.data.expenses.filter(expense => expense._id !== action.payload);
        },
    },
});

export const { addExpense, editExpense, deleteExpense, initializeExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;
