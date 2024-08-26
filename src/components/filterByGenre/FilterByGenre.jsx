import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from './FilterByGenre.module.css';


const FILTER_STRING = 'Filter by Genre'

export default function FilterByGenre({ handleGenreChange, onFilterHandle, uniqueGenres }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectChange = (e) => {
        const { value, checked } = e.target;
        handleGenreChange(value, checked);
    };

    const onHandleClick = () => {
        onFilterHandle();
        setIsOpen(false);
    }

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