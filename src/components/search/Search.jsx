import { useState } from 'react';
import { useSearchMovieData } from '../../hooks/useSearchMovieData';
import styles from './Search.module.css';

const Search = () => {
    const [query, setQuery] = useState('');

    const { fetchSuggestions, handleSuggestionClick, suggestions } = useSearchMovieData();

    const onHandleClick = (movieId) => {
        handleSuggestionClick(movieId)
        setQuery('')
    }

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        fetchSuggestions(value);
    };

    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for a movie..."
            />
            {suggestions.length > 0 && (
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
