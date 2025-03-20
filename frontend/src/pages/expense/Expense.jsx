import Layout from '../Layout.jsx';
import { useEffect, useState } from 'react';
import { deleteExpense } from '../../redux/expenses/expenseSlice.js';
import dateFormat from '../../utils/dateFormat.js';
import ExpenseModal from '../../components/modal/ExpenseModal.jsx';
import ConfirmModal from '../../components/modal/ConfirmModal.jsx';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import useFetchExpenses from '../../hooks/useFetchExpenses.js';

// icons
import { FaPlusSquare } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Expense = () => {
    const [fun, setFun] = useState('');
    const [title, setTitle] = useState('');
    const [expense, setExpense] = useState();
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);
    const [filterFormData, setFilterFormData] = useState({ search: '', month: '' });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const dispatch = useDispatch();
    const { data, fetchExpenses, status } = useFetchExpenses();

    const showAddModal = () => {
        setFun('add');
        setTitle('Add Expense');
        document.getElementById('add_expense_modal').showModal();
    };

    const handleEdit = (id) => {
        setFun('edit');
        setTitle('Edit Expense');
        const expense = data.expenses.find(expense => expense._id === id);
        const initialDate = new Date(expense.date);
        const formattedDate = initialDate.toISOString().split('T')[0];
        setExpense({ ...expense, date: formattedDate });
        document.getElementById('add_expense_modal').showModal();
    };

    const onClickDelete = (id) => {
        setId(id);
        document.getElementById('expense_delete_modal').showModal();
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`/api/expense/${id}`);
            if (res.status === 200) {
                dispatch(deleteExpense(id));
                toast('Expense deleted', {
                    duration: 4000,
                    position: 'top-right',
                    type: 'success',
                });
            }
            document.getElementById('expense_delete_modal').close();
        } catch (error) {
            toast('something went wrong', {
                duration: 4000,
                position: 'top-right',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (e) => {
        e.preventDefault();
        fetchExpenses(filterFormData, page, limit);
    };

    const clearFilterFormData = () => {
        setFilterFormData({ search: '', month: '' });
        fetchExpenses(filterFormData, page, limit);
    };

    const nextPage = () => {
        if (page === data.totalPages) return;
        setPage(page + 1);
    };

    const prePage = () => {
        if (page === 1) return;
        setPage(page - 1);
    };

    useEffect(() => {
        fetchExpenses(filterFormData, page, limit);
    }, [page, limit]);

    return (
        <Layout className='relative'>
            <div className='flex flex-row m-4 gap-4'>
                <div className='w-full'>
                    <form className='flex flex-row gap-2' onSubmit={handleFilter}>
                        <label className="input">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                            <input
                                onChange={(e) => setFilterFormData({ ...filterFormData, search: e.target.value })}
                                value={filterFormData.search}
                                type="search" className="grow" placeholder="Search" />
                        </label>
                        <input
                            onChange={(e) => setFilterFormData({ ...filterFormData, month: e.target.value })}
                            value={filterFormData.month}
                            type="month" className="input" />
                        <button type='submit' className='btn-primary'>Search</button>
                        <button type='button' className='btn-danger' onClick={clearFilterFormData}>Clear</button>
                    </form>

                    {status === 'succeeded' && (
                        <div className='bg-base-100 shadow rounded p-4 mt-4'>
                            <div className='flex flex-row justify-between'>
                                <h2 className='text-lg font-semibold mb-4'>Expenses</h2>
                                <div>
                                    <button
                                        onClick={showAddModal}
                                        className='btn-primary flex justify-center items-center gap-2'><FaPlusSquare /> Add Expense</button>
                                </div>
                            </div>

                            {data.expenses.length === 0 && (
                                <div className='text-base-content font-semibold text-center mt-5'>
                                    There is no expense record.
                                </div>
                            )}

                            {data.expenses.length > 0 && (
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Index</th>
                                                <th>Category</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th className='min-w-[110px]'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.expenses.map((expense, index) => (
                                                <tr key={index}>
                                                    <th>{index + 1}</th>
                                                    <td>{expense.category}</td>
                                                    <td>{expense.description}</td>
                                                    <td className='text-error'>{expense.amount}</td>
                                                    <td>{dateFormat(expense.date)}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleEdit(expense._id)}
                                                            className='btn-primary mr-1'>
                                                            <MdModeEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => onClickDelete(expense._id)}
                                                            className='btn-danger'>
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        </div>
                    )}
                    {data.totalPages > 1 && <div className='flex flex-row justify-end mt-3'>
                        <div className="join">
                            {page > 1 && <button className="join-item btn" onClick={prePage}>«</button>}
                            <button className="join-item btn">Page {page}</button>
                            {page < data.totalPages && <button className="join-item btn" onClick={nextPage}>»</button>}
                        </div>
                    </div>}
                </div>
            </div>

            <ConfirmModal
                id={'expense_delete_modal'}
                loading={loading}
                title={'Are you sure?'}
                description={'You want to delete this expense?'}
                onConfirm={confirmDelete} />

            {status === 'loading' && (
                <div className='absolute inset-0 flex items-center justify-center'>
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            )}
            <ExpenseModal title={title} data={expense} state={fun} />
        </Layout>
    );
};

export default Expense;

