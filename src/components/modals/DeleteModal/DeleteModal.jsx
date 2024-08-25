import CloseButton from '../../buttons/closeButton/CloseButton';

import styles from './DeleteModal.module.css';

const DeleteModal = ({ openCloseModal, handleDelete, movie }) => {
    return (
        <div className={styles.modalOverlay} onClick={openCloseModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <CloseButton openCloseModal={openCloseModal}/>
                <h3>DELETE MOVIE</h3>
                <div className={styles.textWrapper}>
                    <p>Are you sure you want to delete</p>
                    <p className={styles.movie}>{movie.title}</p>
                </div>
                <div className={styles.buttonWrapper}>
                    <button onClick={openCloseModal} className={styles.cancel}>Cancel</button>
                    <button onClick={() => handleDelete(movie.tmdbID)} className={styles.delete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal