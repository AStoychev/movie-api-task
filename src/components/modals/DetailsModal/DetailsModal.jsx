import { useState } from "react";
import CloseButton from "../../buttons/closeButton/CloseButton";
import TrailerIcon from "../../trailerIcon/TrailerIcon";

import styles from './DetailsModal.module.css';

import noImage from '../../../assets/photo.png'

const DetailsModal = ({ openCloseModal, movie }) => {
    const [selected, setSelected] = useState('option1');

    const handleChange = (event) => {
        setSelected(event.target.value)
    }

    return (
        <div className={styles.modalOverlay} onClick={openCloseModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <CloseButton openCloseModal={openCloseModal} />
                <div className={styles.contentWrapper}>
                    <div className={styles.imageWrapper}>
                        <img src={movie.poster ? movie.poster : noImage} alt={`Movie Image ${movie.title}`} />
                        <TrailerIcon trailer={movie.trailer} />
                    </div>
                    <div className={styles.detailsWrapper}>
                        <h4>{movie.title}</h4>
                        <p>{movie.genres.join(' | ')}</p>
                        <div className={styles.detailsWrapperRow}>
                            <div className={styles.detailsWrapperColumn}>
                                <span>RATING</span>
                                <p>{movie.rating}</p>
                            </div>
                            <div className={styles.detailsWrapperColumn}>
                                <span>DURATION</span>
                                <p>{movie.duration} min</p>
                            </div>
                            <div className={styles.detailsWrapperColumn}>
                                <span>PUBLISH</span>
                                <p>{movie.release}</p>
                            </div>
                        </div>
                        <div className={styles.radioButtons}>
                            <label className={selected === 'option1' ? styles.labelSelected : styles.label}>
                                <input
                                    type="radio"
                                    value="option1"
                                    checked={selected === 'option1'}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                />
                                OVERVIEW
                            </label>

                            <label className={selected === 'option2' ? styles.labelSelected : styles.label}>
                                <input
                                    type="radio"
                                    value="option2"
                                    checked={selected === 'option2'}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                />
                                ACTORS
                            </label>

                            <label className={selected === 'option3' ? styles.labelSelected : styles.label}>
                                <input
                                    type="radio"
                                    value="option3"
                                    checked={selected === 'option3'}
                                    onChange={handleChange}
                                    className={styles.radioInput}
                                />
                                DIRECTOR
                            </label>
                        </div>
                        <div className={styles.radioButtonsInformation}>
                            {selected === 'option1' && <p>{movie.overview}</p>}
                            {selected === 'option2' && <p>{movie.actors}</p>}
                            {selected === 'option3' && <p>{movie.director}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;
