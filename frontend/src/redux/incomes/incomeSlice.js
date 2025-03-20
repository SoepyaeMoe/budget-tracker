import { createSlice } from '@reduxjs/toolkit';

const incomeSlice = createSlice({
    name: 'incomes',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {
        initializeIncomes: (state, action) => {
            state.data = action.payload;
        },
        addIncome: (state, action) => {
            state.data.incomes.unshift(action.payload);
        },
        editIncome: (state, action) => {
            const { _id, category, description, amount, date } = action.payload;
            state.data.incomes = state.data.incomes.map(income => {
                if (income._id === _id) {
                    return { ...income, category, description, amount, date };
                }
                return income;
            });
        },
        deleteIncome: (state, action) => {
            state.data.incomes = state.data.incomes.filter(income => income._id !== action.payload);
        },

    },
});

export const { addIncome, editIncome, deleteIncome, initializeIncomes } = incomeSlice.actions;

export default incomeSlice.reducer;