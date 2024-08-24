import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Card from '../../components/card/Card';
import CustomButton from '../../components/CustomButton/CustomButton';
import Search from '../../components/search/Search';
import FilterByGenre from '../../components/filterByGenre/FilterByGenre';

import styles from './PreviewPage.module.css';

function PreviewPage() {
    const [filterType, setFilterType] = useState();
    const [movie, setMovie] = useState(null);
    const [currentGenres, setCurrentGenre] = useState([]);
    const allMovies = useSelector(state => state.movies.movies);

    const status = useSelector(state => state.movies.status);
    const error = useSelector(state => state.movies.error);

    const handleGenreChange = (genre, isChecked) => {
        if (isChecked) {
            setCurrentGenre([...currentGenres, genre]);
        } else {
            setCurrentGenre(currentGenres.filter((g) => g !== genre));
        }
    };

    const onHandleSave = () => {
        console.log('Save')
    }

    const combineGenre = [];
    allMovies.map(movie => combineGenre.push(...movie.genres));
    const uniqueGenres = [...new Set(combineGenre)];

    const filteredMovies = useMemo(() => {
        if (currentGenres.length === 0) return allMovies;
        return allMovies.filter((movie) =>
            movie.genres.some((genre) => currentGenres.includes(genre))
        );
    }, [allMovies, currentGenres]);

    const onFilterHandle = () => {
        setFilterType(currentGenres)
    }

    useEffect(() => {
        if (filterType) {
            setMovie(filteredMovies)
        }
        else if (!filterType) {
            setMovie(allMovies);
        }
    }, [allMovies, filterType]);

    return (
        <div className={styles.homeDark}>
            <div className="container">
                <div className={styles.movieSelector}>
                    <Search />
                    <FilterByGenre handleGenreChange={handleGenreChange} onFilterHandle={onFilterHandle} uniqueGenres={uniqueGenres} />
                </div>
                <div className={styles.moviewWrapper}>
                    {movie && movie.map(movie => (
                        <div key={movie.tmdbID} className={styles.movies}>
                            <Card movie={movie} />
                        </div>
                    ))}
                </div>
                <CustomButton title={'SAVE'} onHandleClick={onHandleSave} />
            </div>
        </div>
    )
}

export default PreviewPage;