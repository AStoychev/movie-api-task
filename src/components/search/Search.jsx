import { useState, useEffect, useRef } from 'react';
import { useSearchMovieData } from '../../hooks/useSearchMovieData';
import styles from './Search.module.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [suggerstionBar, setSugestionBar] = useState(false)

    const { fetchSuggestions, handleSuggestionClick, suggestions } = useSearchMovieData();

    const searchWrapperRef = useRef(null);


    const onHandleClick = (movieId) => {
        handleSuggestionClick(movieId)
        setQuery('')
    }

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        fetchSuggestions(value);
        setSugestionBar(true)
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setSugestionBar(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [searchWrapperRef]);

    return (
        <div className={styles.searchWrapper} ref={searchWrapperRef}>
            <input
                className={styles.textInput}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for a movie..."
            />
            {suggestions.length > 0 && suggerstionBar && (
                <ul className={styles.suggestionsDropdown}>
                    {suggestions.map((movie) => (
                        <li key={movie.id} onClick={() => onHandleClick(movie.id)}>
                            {movie.title} ({movie.release_date?.substring(0, 4)})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
