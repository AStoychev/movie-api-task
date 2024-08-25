import { useSelector } from "react-redux";
import axios from "axios";

export const useSendMovieData = () => {
    const movies = useSelector(state => state.movies.movies);

    const sendData = async () => {
        console.log('MOVIES DATA: ', movies)
        // try {
        //     const response = await axios.post('/api/save-movie-data', {
        //         movies: movies
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         }
        //     });

        //     if (response.status === 200) {
        //         console.log('Movie data saved successfully');
        //     } else {
        //         throw new Error('Failed to save movie data');
        //     }
        // } catch (error) {
        //     console.error('Error saving movie data:', error);
        // }
    };

    return { sendData }
};