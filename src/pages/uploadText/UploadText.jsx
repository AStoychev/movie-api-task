import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { moviesFetched } from "../../store/slices/moviesSlice";

import Checkbox from "../../components/Checkbox/Checkbox";
import CustomButton from "../../components/buttons/customButton/CustomButton";

import fetchMovieData from "../../services/fetchMovieData";

import { FiUploadCloud } from "react-icons/fi";
// import { MdFileUpload } from "react-icons/md";
import styles from "./UploadText.module.css";

import filmStrip from "../../assets/movie-roll.png";

function UploadText() {
    const [movies, setMovies] = useState([]);
    const [dragging, setDragging] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const movieTitles = text.split('\r\n').filter(title => title.trim());
            const uniqueTitles = [...new Set(movieTitles)];
            setMovies(uniqueTitles.map((title) => ({ title, selected: true })));
            // setMovies(movieTitles.map((title) => ({ title, selected: true })));
        };
        reader.readAsText(file);
    };

    const handleFileDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file && file.type === 'text/plain') {
            handleFileUpload(file);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/plain') {
            handleFileUpload(file);
        }
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const toggleSelect = (index) => {
        const updatedMovies = movies.map((movie, i) =>
            i === index ? { ...movie, selected: !movie.selected } : movie
        );
        setMovies(updatedMovies);
    };

    const selectCheckedTitles = (checkedTitles) => {
        return (movies.filter(movie => movie.selected).map(movie => movie.title))
    };

    const checkedTitles = selectCheckedTitles(movies);

    const onHandleClick = () => {
        fetchMovieData(checkedTitles).then(result => {
            // setTimeout(() => {
            //     dispatch(moviesFetched(result));
            // }, 2000)
            dispatch(moviesFetched(result));
        });
        navigate('/preview');
    };

    return (
        <div className="container">
            {/* <div className={styles.filmStrip}>
                <img className={styles.imageBackground} src={filmStrip} alt="Film Strip" />
            </div> */}
            <div className={styles.wrapper}>
                <div className={styles.uploadWrapper}>
                    <div
                        className={styles.dragZone}
                        onDrop={handleFileDrop}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                    // style={{ border: dragging ? '2px dashed #ccc' : '2px solid transparent' }}
                    >
                        <div className={styles.btnUpload}>
                            <label htmlFor="file-upload" className={styles.customFileUpload}>
                                <FiUploadCloud className={styles.icon} />
                            </label>
                            <input
                                type="file"
                                accept=".txt"
                                id="file-upload"
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                        </div>

                        <div className={styles.textWrapper}>
                            <h3>Drag & Drop</h3>
                            <p>or click over cloud and select .txt file from device</p>
                        </div>
                    </div>
                </div>

                {movies.length ?
                    <div className={styles.moviesWrapper}>
                        <div className={styles.movies}>
                            {movies.map((movie, index) => (
                                <Checkbox key={index} index={index} movie={movie} toggleSelect={toggleSelect} />
                            ))}
                        </div>
                        <CustomButton title={'SEARCH'} onHandleClick={onHandleClick} />
                    </div>
                    :
                    ''
                }
            </div>
        </div>
    );
}

export default UploadText;
