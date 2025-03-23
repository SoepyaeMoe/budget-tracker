import { useEffect, useState } from 'react';
import Layout from './Layout.jsx';
import useFetchIncomes from '../hooks/useFetchIncomes.js';
import useFetchExpenses from '../hooks/useFetchExpenses.js';
import dateFormat from '../utils/dateFormat.js';

const Home = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { data: incomesData, status: incomeStatus, fetchIncomes } = useFetchIncomes();
    const { data: expensesData, status: expenseStatus, fetchExpenses } = useFetchExpenses();


    const getYearAndMonth = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        return `${year}-${month}`;
    }

    const handelInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'start') setStartDate(value);
        if (name === 'end') setEndDate(value);
    }

    const totalIncome = () => {
        let total = 0;
        if (incomeStatus === 'succeeded') incomesData.incomes.forEach(income => total += income.amount);
        return total;
    }

    const totalExpense = () => {
        let total = 0;
        if (expenseStatus === 'succeeded') expensesData.expenses.forEach(expense => total += expense.amount);
        return total;
    }

    const handelFilter = () => {
        fetchIncomes({ startDate, endDate });
        fetchExpenses({ startDate, endDate });
    }

    useEffect(() => {
        fetchIncomes({ month: getYearAndMonth() });
        fetchExpenses({ month: getYearAndMonth() });
    }, []);

    return (
        <Layout>
            <div className='p-4'>
                <div className='flex gap-2 items-end'>
                    <div>
                        <label className='text-sm font-semibold' >Start Date</label>
                        <input
                            onChange={handelInputChange}
                            type="date" name='start' className="input" />
                    </div>
                    <div>
                        <label className='text-sm font-semibold'>End Date</label>
                        <input
                            onChange={handelInputChange}
                            type="date" name='end' className="input" />
                    </div>
                    <button onClick={handelFilter} className='btn-primary'>Search</button>
                </div>

                <div className='text-base-content mt-4 font-semibold'>
                    {startDate && endDate ? `${startDate} to ${endDate}` : getYearAndMonth()}
                </div>

                <div className='grid grid-cols-3 gap-2 mb-8 mt-1'>
                    <div className="card bg-base-100 card-sm md:card-md shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Total Income</h2>
                            <p className='text-success text-xl'>{totalIncome()}</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 card-sm md:card-md shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Total Expenses</h2>
                            <p className='text-error text-xl'>{totalExpense()}</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 card-sm md:card-md shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Remaining Balance</h2>
                            <p className={(totalIncome() - totalExpense() > 0 ? 'text-success' : 'text-error') + " text-xl"}>{totalIncome() - totalExpense()}</p>
                        </div>
                    </div>

                </div>

                <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='mb-4'>
                        <h2 className='text-sm font-semibold mb-2'>Incomes</h2>
                        <div className='overflow-x-auto bg-base-100'>
                            <table className='table table-sm table-zebra'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incomeStatus === 'succeeded' && incomesData.incomes.map((income, index) => (
                                        <tr key={index}>
                                            <td>{dateFormat(income.date)}</td>
                                            <td>{income.category}</td>
                                            <td>{income.description}</td>
                                            <td className='text-success'>{income.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h2 className='text-sm font-semibold mb-2'>Expenses</h2>
                        <div className='overflow-x-auto bg-base-100'>
                            <table className='table table-sm table-zebra'>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Category</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenseStatus === 'succeeded' && expensesData.expenses.map((expense, index) => (
                                        <tr key={index}>
                                            <td>{dateFormat(expense.date)}</td>
                                            <td>{expense.category}</td>
                                            <td>{expense.description}</td>
                                            <td className='text-error'>{expense.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {incomeStatus === 'loading' || expenseStatus === 'loading' && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                )}

            </div >
        </Layout >
    )
}

export default Home