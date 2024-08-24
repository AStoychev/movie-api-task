import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SelectLanguage from './SelectLanguage';

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = 'https://api.themoviedb.org/3';

const MovieSearch = () => {
    const [movies, setMovies] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const fetchMovies = async (query) => {
        try {
            const response = await axios.get(`${API_URL}/search/movie`, {
                params: {
                    api_key: API_KEY,
                    query: query,
                    language: selectedLanguage
                }
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    useEffect(() => {
        // Fetch movies when the component mounts or language changes
        // fetchMovies('your initial query'); // Replace with your initial query
        fetchMovies(selectedLanguage)
    }, [selectedLanguage]);

    console.log(11111111111, movies)

    return (
        <div>
            <SelectLanguage onLanguageChange={setSelectedLanguage} />
            {/* Render movie cards or other UI components */}
        </div>
    );
};

export default MovieSearch;
