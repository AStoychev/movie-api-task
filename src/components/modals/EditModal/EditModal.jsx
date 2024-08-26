import { useState } from "react";
import { useDispatch } from "react-redux";
import { movieEdited } from "../../../store/slices/moviesSlice";

import Input from "./input/Input";
import CloseButton from "../../buttons/closeButton/CloseButton";

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
        const updatedMovie = {
            ...movie,
            ...movieData,
            genres: typeof movieData.genres === 'string'
            ? movieData.genres.split(',').map(genre => genre.trim()) 
            : movieData.genres,
        };
        dispatch(movieEdited(updatedMovie));
        openCloseModal();
    };

    return (
        <div className={styles.modalOverlay} onClick={openCloseModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <h3>EDIT MOVIE</h3>
                <CloseButton openCloseModal={openCloseModal} />
                <div className={styles.contentWrapper}>
                    <form onSubmit={handleSubmit}>
                        <Input label='Title' type='text' name='title' movie={movieData.title} onChange={handleChange} />
                        <Input label='Overview' textarea={true} name='overview' movie={movieData.overview} onChange={handleChange} />
                        <Input label='Actors' type='text' name='actors' movie={movieData.actors} onChange={handleChange} />
                        <Input label='Genres' type='text' name='genres' movie={movieData.genres} onChange={handleChange} />
                        <Input label='Poster URL' type='text' name='poster' movie={movieData.poster} onChange={handleChange} />
                        <Input label='Release Date' type='date' name='release' movie={movieData.release} onChange={handleChange} />
                        <Input label='Rating' type='number' name='rating' movie={movieData.rating} onChange={handleChange} min='0' max='10' step='0.001' />
                        <Input label='Trailer URL' type='text' name='trailer' movie={movieData.trailer} onChange={handleChange} />
                        <Input label='Director' type='text' name='director' movie={movieData.director} onChange={handleChange} />
                        <Input label='Duration' type='number' name='duration' movie={movieData.duration} onChange={handleChange} />
                        <div className={styles.buttonWrapper}>
                            <button onClick={openCloseModal} className={styles.cancel}>Cancel</button>
                            <button type="submit" className={styles.delete}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditModal;