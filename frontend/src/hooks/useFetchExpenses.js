import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeExpenses } from '../redux/expenses/expenseSlice.js';

const useFetchExpenses = () => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState('idle');
    const { data } = useSelector(state => state.expenses);

    const fetchExpenses = async ({ search, month }, page, limit) => {
        setStatus('loading');
        try {
            const res = await axios.get(`/api/expense?search=${search}&month=${month}&page=${page}&limit=${limit}`);
            if (res.status === 200) {
                setStatus('succeeded');
                dispatch(initializeExpenses(res.data));
            }
        } catch (error) {
            setStatus('failed');
        }
    }

    return { fetchExpenses, status, data };
}

export default useFetchExpenses