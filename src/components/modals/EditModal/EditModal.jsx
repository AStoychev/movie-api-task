import { useState } from "react";
import { useDispatch } from "react-redux";
import { movieEdited } from "../../../store/slices/moviesSlice";

import styles from './EditModal.module.css';

function EditModal({ openCloseModal, movie }) {
    const [movieData, setMovieData] = useState({
        tmdbID: movie.tmdbID || '',
        title: movie.title || '',
        overview: movie.overview || '',
        actors: movie.actors || '',
        genres: movie.genres || '',
        poster: movie.poster || '',
        release: movie.release || '',
        rating: movie.rating || '',
        trailer: movie.trailer || '',
        director: movie.director || '',
        duration: movie.duration || '',
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({
            ...movieData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(movieEdited(movieData));
        openCloseModal();
    };

    return (
        <div className={styles.modalOverlay} onClick={openCloseModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h3>EDIT MOVIE</h3>
                <div className={styles.buttonWrapper}>
                    <button className={styles.modalClose} onClick={openCloseModal}>x</button>
                </div>
                <div className={styles.contentWrapper}>

                    <form onSubmit={handleSubmit}>
                        {/* <div>
                            <label>TMDB ID:</label>
                            <input
                                type="text"
                                name="tmdbId"
                                value={movieData.tmdbID}
                                onChange={handleChange}
                            />
                        </div> */}

                        <div>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={movieData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Overview:</label>
                            <textarea
                                name="overview"
                                value={movieData.overview}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Actors (comma-separated):</label>
                            <input
                                type="text"
                                name="actors"
                                value={movieData.actors}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Genres (comma-separated):</label>
                            <input
                                type="text"
                                name="genres"
                                value={movieData.genres}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Poster URL:</label>
                            <input
                                type="text"
                                name="poster"
                                value={movieData.poster}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Release Date:</label>
                            <input
                                type="date"
                                name="releaseDate"
                                value={movieData.release}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Rating:</label>
                            <input
                                type="number"
                                name="rating"
                                value={movieData.rating}
                                onChange={handleChange}
                                min="0"
                                max="10"
                                step="0.1"
                            />
                        </div>

                        <div>
                            <label>Trailer URL:</label>
                            <input
                                type="text"
                                name="trailer"
                                value={movieData.trailer}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Director:</label>
                            <input
                                type="text"
                                name="director"
                                value={movieData.director}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Duration (minutes):</label>
                            <input
                                type="number"
                                name="duration"
                                value={movieData.duration}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditModal;