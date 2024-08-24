import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from './FilterByGenre.module.css';


const FILTER_STRING = 'Filter by Genre'

export default function FilterByGenre({ handleGenreChange, onFilterHandle, uniqueGenres }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectChange = (e) => {
        const {value, checked} = e.target;
        handleGenreChange(value, checked);
    };

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdownWrapper}>
                <button onClick={() => setIsOpen(!isOpen)} className={styles.selectDark}>
                    {FILTER_STRING}
                    <RiArrowDropDownLine />
                </button>
            </div>
            {isOpen && (
                <div className={styles.optionsWrapperDark}>
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
                    <button onClick={onFilterHandle}>FILTER</button>
                </div>
            )}
        </div>
    )
};