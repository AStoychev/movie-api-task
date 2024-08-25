import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moviesReordered } from '../../store/slices/moviesSlice';

import Card from '../../components/card/Card';
import CustomButton from '../../components/buttons/customButton/CustomButton';
import Search from '../../components/search/Search';
import FilterByGenre from '../../components/filterByGenre/FilterByGenre';
import MovieSearch from '../../components/selectLanguage/MovieSearch';

import styles from './PreviewPage.module.css';

function PreviewPage() {
    const [filterType, setFilterType] = useState();
    const [movies, setMovie] = useState(null);
    const [currentGenres, setCurrentGenre] = useState([]);
    const allMovies = useSelector(state => state.movies.movies);

    const dispatch = useDispatch();

    const status = useSelector(state => state.movies.status);
    const error = useSelector(state => state.movies.error);

    const handleGenreChange = (genre, isChecked) => {
        if (isChecked) {
            setCurrentGenre([...currentGenres, genre]);
        } else {
            setCurrentGenre(currentGenres.filter((g) => g !== genre));
        }
    };

    const onDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e, targetIndex) => {
        const sourceIndex = e.dataTransfer.getData('text/plain');
        const updatedList = Array.from(movies);
        const [movedItem] = updatedList.splice(sourceIndex, 1);
        updatedList.splice(targetIndex, 0, movedItem);
        setMovie(updatedList);
        dispatch(moviesReordered(updatedList));
    };

    const onHandleSave = () => {
        console.log('Save')
    }

    const combineGenre = [];
    allMovies && allMovies.map(movie => combineGenre.push(...movie.genres));
    const uniqueGenres = [...new Set(combineGenre)];

    const filteredMovies = useMemo(() => {
        if (currentGenres.length === 0) return allMovies;
        // const allGenres = allMovies[0].genres
        // const splitGenres = allGenres.split(' | ');
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
        <div className="container" style={{ alignItems: 'start' }}>
            <div className={styles.wrapper}>
                <div className={styles.movieSelector}>
                    <Search />
                    {/* <MovieSearch/> */}
                    <FilterByGenre handleGenreChange={handleGenreChange} onFilterHandle={onFilterHandle} uniqueGenres={uniqueGenres} />
                </div>
                <div className={styles.moviewWrapper}>
                    {movies && movies.map((movie, index) => (
                        <div
                            key={movie.tmdbID}
                            className={styles.movies}
                            draggable
                            onDragStart={(e) => onDragStart(e, index)}
                            onDragOver={onDragOver}
                            onDrop={(e) => onDrop(e, index)}
                        >
                            <Card movie={movie} />
                        </div>
                    ))}
                </div>
                <div className={styles.buttonWrapper}>
                    <CustomButton title={'SAVE'} onHandleClick={onHandleSave} />
                </div>
            </div>
        </div>
    );
}

export default PreviewPage;