import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeIncomes } from '../redux/incomes/incomeSlice.js';

const useFetchIncomes = () => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState('idle');
    const { data } = useSelector(state => state.incomes);

    const fetchIncomes = async ({ search, month, startDate, endDate }, page, limit) => {
        setStatus('loading');
        try {
            const res = await axios.get(`/api/income?search=${search}&month=${month}&startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`);
            if (res.status === 200) {
                setStatus('succeeded');
                dispatch(initializeIncomes(res.data));
            }
        } catch (error) {
            setStatus('failed');
        }
    }
    return { status, data, fetchIncomes };
}

export default useFetchIncomes

