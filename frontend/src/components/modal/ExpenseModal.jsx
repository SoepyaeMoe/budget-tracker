import { useState, useEffect } from "react";
import { addExpense, editExpense } from '../../redux/expenses/expenseSlice.js';
import axios from "axios";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";

const ExpenseModal = ({ title, data, state }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        category: '',
        description: '',
        amount: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state === 'edit') {
            setFormData(data);
        } else {
            setFormData(initialFormData);
        }
    }, [state, data]);

    const handelInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const initialFormData = {
        category: '',
        description: '',
        amount: '',
        date: ''
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await (state === 'add' ? axios.post('api/expense', formData) : axios.put(`api/expense/${data._id}`, formData));

            if (response.status === 201 || response.status === 200) {
                toast(`${state === 'add' ? 'Income added' : 'Expense updated'} successfully`, {
                    duration: 4000,
                    position: 'top-right',
                    type: 'success',
                    className: 'bg-base-100 text-base-content',
                });
                dispatch(state === 'add' ? addExpense(formData) : editExpense(formData));
                setFormData(initialFormData);
                document.getElementById('add_expense_modal').close();
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast('something went wrong', {
                className: 'bg-gray-900 text-base-content',
                duration: 4000,
                position: 'top-right',
                type: 'error',
            });
            setLoading(false);
        }
    };

    return (
        <dialog className='modal' id='add_expense_modal'>
            <div className='modal-box bg-base-100 shadow rounded p-4 w-[350px] inset-0 mx-auto'>
                <h3 className="text-xl font-semibold dark:text-gray-100 text-gary-800 text-center">{title}</h3>
                <form onSubmit={submitForm}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 dark:text-gray-100 text-sm font-semibold mb-2' htmlFor='category'>Category</label>
                        <input
                            onChange={handelInputChange}
                            value={formData?.category}
                            type="text" list='categories' id='category' name='category'
                            className='w-full dark:bg-gray-700 dark:text-gray-100  bg-gray-100 outline-none px-4 py-2 rounded text-gray-700' placeholder='Category' />
                        <datalist id='categories' className='dark:bg-gray-700 dark:text-gray-100 bg-gray-100 outline-none px-4 py-2 rounded text-gray-700 mt-2'>
                            <option value='Breakfast' />
                            <option value='Lunch' />
                            <option value='Dinner' />
                            <option value='Bill' />
                        </datalist>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 dark:text-gray-100 text-sm font-semibold mb-2' htmlFor='description'>Description</label>
                        <input
                            onChange={handelInputChange}
                            value={formData?.description}
                            type="text" id='description' name='description'
                            className='w-full dark:bg-gray-700 dark:text-gray-100  bg-gray-100 outline-none px-4 py-2 rounded text-gray-700' placeholder='Description' />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 dark:text-gray-100 text-sm font-semibold mb-2' htmlFor='amount'>Amount</label>
                        <input
                            onChange={handelInputChange}
                            value={formData?.amount}
                            type="number" id='amount' name='amount' min={0}
                            className='w-full dark:bg-gray-700 dark:text-gray-100  bg-gray-100 outline-none px-4 py-2 rounded text-gray-700' placeholder='Amount' />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 dark:text-gray-100 text-sm font-semibold mb-2' htmlFor='date'>Date</label>
                        <input
                            onChange={handelInputChange}
                            value={formData?.date}
                            type="date" id='date' name='date'
                            className='w-full dark:bg-gray-700 dark:text-gray-100  bg-gray-100 outline-none px-4 py-2 rounded text-gray-700' placeholder='Date' />
                    </div>

                    <div className='flex justify-end'>
                        <button type='submit' className='btn-primary min-w-[65px]'>{loading ? <span className="loading loading-dots loading-xs"></span> : 'Submit'}</button>
                    </div>
                </form>
            </div>

            <form method='dialog' className='modal-backdrop'>
                <button className='outline-none'>close</button>
            </form>
        </dialog>
    )
}

export default ExpenseModal

