import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { moviesFetched, moviesLoading, moviesFailed } from "../../store/slices/moviesSlice";

import Checkbox from "../../components/Checkbox/Checkbox";
import CustomButton from "../../components/CustomButton/CustomButton";

import fetchMovieData from "../../services/fetchMovieData";

import { MdFileUpload } from "react-icons/md";
import styles from "./UploadText.module.css";

import filmStrip from "../../assets/movie-roll.png"

function UploadText() {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const movieTitles = text.split('\r\n').filter(title => title.trim());
            setMovies(movieTitles.map((title) => ({ title, selected: true })));
        };
        reader.readAsText(file);
    };

    const toggleSelect = (index) => {
        const updatedMovies = movies.map((movie, i) =>
            i === index ? { ...movie, selected: !movie.selected } : movie
        );
        setMovies(updatedMovies);
    };

    const selectCheckedTitles = (checkedTitles) => {
        return (movies.filter(movie => movie.selected).map(movie => movie.title))
    }

    const checkedTitles = selectCheckedTitles(movies);

    const onHandleClick = () => {
        fetchMovieData(checkedTitles).then(result => {
            dispatch(moviesFetched(result))
        });
        navigate('/preview')
    }


    return (
        <div className="container">
            <div className={styles.filmStrip}>
                <img className={styles.imageBackground} src={filmStrip} alt="Film Strip" />
            </div>
            <div className={styles.wrapper}>

                <div className={styles.btnUpload}>
                    <label htmlFor="file-upload" className={styles.customFileUpload}>
                        <MdFileUpload className={styles.icon} />
                    </label>
                    <input type="file" accept=".txt" id="file-upload" onChange={handleFileUpload} />
                </div>

                <div className={styles.moviesWrapper}>
                    {movies.map((movie, index) => (
                        <Checkbox key={index} index={index} movie={movie} toggleSelect={toggleSelect} />
                    ))}
                </div>

                <CustomButton title={'SEARCH'} onHandleClick={onHandleClick} />
            </div>
        </div>
    );
}

export default UploadText;