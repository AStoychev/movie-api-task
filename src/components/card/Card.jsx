import { useState } from "react";
import { useDispatch } from "react-redux";
import { movieDeleted } from "../../store/slices/moviesSlice";

import DetailsModal from "../modals/DetailsModal/DetailsModal";
import EditModal from "../modals/EditModal/EditModal";

import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import styles from './Card.module.css';

function Card({ movie }) {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const dispatch = useDispatch();

    const openCloseDetailsModal = () => {
        setIsDetailsModalOpen(!isDetailsModalOpen);
    }

    const openCloseEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    }

    const handleDelete = (id) => {
        dispatch(movieDeleted(id));
    };

    return (
        <div className={styles.cardWrapper}>
            {isDetailsModalOpen && <DetailsModal openCloseModal={openCloseDetailsModal} movie={movie} />}
            {isEditModalOpen && <EditModal openCloseModal={openCloseEditModal} movie={movie}/>}
            <div className={styles.flagWrapper} onClick={openCloseDetailsModal}>
                <img src={movie.poster} alt={movie.title} />
            </div>
            <div className={styles.infoWrapper}>
                <h4>{movie.title}</h4>
                <p>Rating: {movie.rating}</p>
                <div className={styles.buttonsWrapper}>
                    <button onClick={openCloseEditModal}>
                        <CiEdit className={styles.editIcon} />
                    </button>
                    <button onClick={() => handleDelete(movie.tmdbID)}>
                        <TiDelete className={styles.deleteIcon} />
                    </button>
                </div>
            </div>
        </div>

        // <div className={styles.cardDark}>
        //     <div className={styles.cardWrapper}>
        //         <div className={styles.flagWrapper}>
        //             <img src={movie.poster} alt={movie.title} />
        //         </div>
        //         <div className={styles.infoWrapper}>
        //             <h4>{movie.title}</h4>
        //             <p>Rating: {movie.rating}</p>
        //         </div>
        //     </div>
        // </div>
    )

}

export default Card;