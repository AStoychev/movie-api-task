import { useState } from "react";
import { useDispatch } from "react-redux";
import { movieDeleted } from "../../store/slices/moviesSlice";

import DetailsModal from "../modals/DetailsModal/DetailsModal";
import EditModal from "../modals/EditModal/EditModal";
import DeleteModal from "../modals/DeleteModal/DeleteModal";

import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import styles from './Card.module.css';

import noImage from '../../assets/photo.png'

function Card({ movie }) {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIdDeleteModalOpen] = useState(false);
    const dispatch = useDispatch();

    const openCloseDetailsModal = () => {
        setIsDetailsModalOpen(!isDetailsModalOpen);
    }

    const openCloseEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    }

    const openCloseDeleteModal = () => {
        setIdDeleteModalOpen(!isDeleteModalOpen)
    }

    const handleDelete = (id) => {
        dispatch(movieDeleted(id));
    };

    const roundNumber = (number) => {
        const result = Math.round(number * 100) / 100
        return result
    }

    return (
        <div className={styles.cardWrapper}>
            {isDetailsModalOpen && <DetailsModal openCloseModal={openCloseDetailsModal} movie={movie} />}
            {isEditModalOpen && <EditModal openCloseModal={openCloseEditModal} movie={movie} />}
            {isDeleteModalOpen && <DeleteModal openCloseModal={openCloseDeleteModal} handleDelete={handleDelete} movie={movie} />}
            <div className={styles.detailsWrapper} onClick={openCloseDetailsModal}>
                <div className={styles.flagWrapper}>
                    <div className={styles.rating}>{roundNumber(movie.rating)}</div>
                    <img className={styles.cardImage} src={movie.poster ? movie.poster : noImage} alt={`Movie Image ${movie.title}`} />
                </div>
                <div className={styles.infoWrapper}>
                    <h4>{movie.title}</h4>
                    <p>{movie.genres.join(' | ')}</p>
                </div>
            </div>
            <div className={styles.buttonsWrapper}>
                <button onClick={openCloseEditModal}>
                    <CiEdit className={styles.editIcon} />
                </button>
                <button onClick={openCloseDeleteModal}>
                    <TiDelete className={styles.deleteIcon} />
                </button>
            </div>
        </div>
    )
}

export default Card;