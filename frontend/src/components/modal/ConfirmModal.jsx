const ConfirmModal = ({ title, description, onConfirm, loading, id }) => {
    return (
        <>
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{description}</p>
                    <div className="modal-action">
                        <button onClick={onConfirm} className='btn-primary min-w-[65px]'>{loading ? <span className="loading loading-dots loading-xs"></span> : 'Confirm'}</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default ConfirmModal