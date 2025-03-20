import Layout from '../Layout.jsx';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIncome } from '../../redux/incomes/incomeSlice.js';
import dateFormat from '../../utils/dateFormat.js';
import IncomeModal from '../../components/modal/IncomeModal.jsx';
import ConfirmModal from '../../components/modal/ConfirmModal.jsx';
import useFetchIncomes from '../../hooks/useFetchIncomes.js';
import toast from 'react-hot-toast';
import axios from 'axios';


// icons
import { FaPlusSquare } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const Income = () => {
    const [modalState, setModalState] = useState(''); // used to show add or edit modal because used same modal
    const [modalTitle, setModalTitle] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, status, fetchIncomes } = useFetchIncomes();

    const dispatch = useDispatch();

    const showAddModal = () => {
        setModalState('add');
        setModalTitle('Add Income');
        document.getElementById('add_income_modal').showModal();
    };

    // handle edit 
    const [income, setIncome] = useState();
    const handleEdit = (id) => {
        setModalState('edit');
        setModalTitle('Edit Income');
        const income = data.incomes.find(income => income._id === id);
        const initialDate = new Date(income.date);
        const formattedDate = initialDate.toISOString().split('T')[0];
        setIncome(income);
        setIncome({ ...income, date: formattedDate });
        document.getElementById('add_income_modal').showModal();

    };

    // handle delete
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);
    const onClickDelete = (id) => {
        setId(id);
        document.getElementById('income_delete_model').showModal();
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`/api/income/${id}`);
            if (res.status === 200) {
                dispatch(deleteIncome(id));
            }
            toast('Income deleted', {
                duration: 4000,
                position: 'top-right',
                type: 'success',
            });
            document.getElementById('income_delete_model').close();
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

    // filter
    const [filterFormData, setFilterFormData] = useState({
        search: '',
        month: ''
    });
    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(fetchIncomes(filterFormData));
    };

    const clearFilterFormData = () => {
        setFilterFormData({ search: '', month: '' });
        dispatch(fetchIncomes({ search: '', month: '' }));
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
        fetchIncomes(filterFormData, page, limit);
    }, [page, limit]);

    return (
        <Layout className='relative'>
            <div className='flex flex-row m-4 gap-4'>
                <div className='w-full'>

                    {/* filter form */}
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
                        <button type='button' className='btn-danger ' onClick={clearFilterFormData}>Clear</button>
                    </form>

                    {status === 'succeeded' && <div className='bg-base-100 shadow rounded p-4 mt-4'>

                        <div className='flex flex-row justify-between'>
                            <h2 className='text-lg font-semibold mb-4'>Incomes</h2>
                            <div>
                                <button
                                    onClick={showAddModal}
                                    className='btn-primary flex justify-center items-center gap-2'><FaPlusSquare /> Add Income</button>
                            </div>
                        </div>
                        {data.incomes.length === 0 && <div className='text-base-content font-semibold text-center mt-5'>There is no income record.</div>}
                        {data.incomes.length > 0 && <div className="overflow-x-auto">
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
                                    {data.incomes.map((income, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{income.category}</td>
                                            <td>{income.description}</td>
                                            <td className='text-success'>{income.amount}</td>
                                            <td>{dateFormat(income.date)}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleEdit(income._id)}
                                                    className='btn-primary mr-1'>
                                                    <MdModeEdit />
                                                </button>
                                                <button
                                                    onClick={() => onClickDelete(income._id)}
                                                    className='btn-danger'>
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                        {data.totalPages > 1 && <div className='flex flex-row justify-end mt-3'>
                            <div className="join">
                                {page > 1 && <button className="join-item btn" onClick={prePage}>«</button>}
                                <button className="join-item btn">Page {page}</button>
                                {page < data.totalPages && <button className="join-item btn" onClick={nextPage}>»</button>}
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>

            <ConfirmModal
                id={'income_delete_model'}
                loading={loading}
                title={'Are you sure?'}
                description={'You want to delete this income?'}
                onConfirm={confirmDelete} />

            {
                status === 'loading' && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                )
            }
            <IncomeModal title={modalTitle} data={income} state={modalState} />
        </Layout>
    )
}

export default Income

