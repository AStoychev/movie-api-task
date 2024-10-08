import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { moviesFetched } from "../../store/slices/moviesSlice";

import Checkbox from "../../components/checkbox/Checkbox";
import CustomButton from "../../components/buttons/customButton/CustomButton";
import { InfoTooltip } from "../../components/tooltipMainPage/InfoTooltip";
import { CopyTooltip } from "../../components/tooltipMainPage/CopyTooltip";

import fetchMovieData from "../../services/fetchMovieData";
import { movieList } from "../../assets/dataMovies";

import { FiUploadCloud } from "react-icons/fi";
import { LuCopy } from "react-icons/lu";
import { TiInfoLarge } from "react-icons/ti";
import styles from "./UploadText.module.css";

const COPY_TEXT = "Click to copy some movies";
const AFTER_COPY_TEXT = "You copy some movies";

function UploadText() {
    const [movies, setMovies] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [copyText, setCopyText] = useState(COPY_TEXT)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const movieTitles = text.split(/\r\n|\n/).filter(title => title.trim());
            // const movieTitles = text.split('\r\n').filter(title => title.trim());
            const uniqueTitles = [...new Set(movieTitles)];
            setMovies(uniqueTitles.map((title) => ({ title, selected: true })));
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
            dispatch(moviesFetched(result));
        });
        navigate('/preview');
    };

    const onHandleCopy = () => {
        const copyMovies = movieList.join('\n');
        navigator.clipboard.writeText(copyMovies)
        setCopyText(AFTER_COPY_TEXT);
        setTimeout(() => {
            setCopyText(COPY_TEXT)
        }, 1500)
    }

    return (
        <div className="container">
            <div className={styles.wrapper}>
                <div className={styles.uploadWrapper}>
                    <div
                        className={styles.dragZone}
                        onDrop={handleFileDrop}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
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

                            <div className={styles.infoWrapper}>
                                <TiInfoLarge size={20} className={styles.infoIcon} data-tooltip-id="info-tooltip" />
                                <LuCopy size={20} className={styles.copyIcon} onClick={onHandleCopy} data-tooltip-id="copy-tooltip" />
                            </div>

                            <InfoTooltip />
                            <CopyTooltip text={copyText} />

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
