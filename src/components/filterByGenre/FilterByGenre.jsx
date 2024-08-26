import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from './FilterByGenre.module.css';

const FILTER_STRING = 'Filter by Genre'

export default function FilterByGenre({ handleGenreChange, onFilterHandle, uniqueGenres }) {
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const handleSelectChange = (e) => {
        const { value, checked } = e.target;

        setSelectedGenres(prevSelectedGenres =>
            checked
                ? [...prevSelectedGenres, value]
                : prevSelectedGenres.filter(genre => genre !== value)
        );
        handleGenreChange(value, checked);
    };

    const onHandleClick = () => {
        onFilterHandle();
        setIsOpen(false);
    }

    useEffect(() => {
        const selected = uniqueGenres.filter(genre => selectedGenres.includes(genre));
        setSelectedGenres(selected);
    }, [uniqueGenres]);

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownWrapper}>
                <button onClick={() => setIsOpen(!isOpen)} className={styles.selectButton}>
                    {FILTER_STRING}
                    <RiArrowDropDownLine />
                </button>
            </div>
            {isOpen && (
                <div className={styles.optionsWrapper}>
                    <div className={styles.checkboxesWrapper}>
                        {uniqueGenres.map((genre) => (
                            <div key={genre}>
                                <input
                                    type="checkbox"
                                    id={genre}
                                    value={genre}
                                    checked={selectedGenres.includes(genre)}
                                    onChange={handleSelectChange}
                                />
                                <label htmlFor={genre}>{genre}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button onClick={onHandleClick} className={styles.buttonOptions}>FILTER</button>
                    </div>
                </div>
            )}
        </div>
    )
};