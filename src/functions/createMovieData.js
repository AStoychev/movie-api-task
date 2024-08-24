export const createMovieData = (movie) => {
    const movieData = {
        tmdbID: movie.id,
        title: movie.title,
        overview: movie.overview,
        actors: movie.credits.cast.slice(0, 10).map(actor => actor.name),
        genres: movie.genres.map((genre) => genre.name),
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        release: movie.release_date,
        rating: movie.vote_average,
        trailer: movie.videos.results[0]?.key ? `https://www.youtube.com/watch?v=${movie?.videos?.results[0]?.key}` : null,
        director: movie.credits.crew.find(crewMember => crewMember.job === 'Director')?.name,
        duration: movie.runtime,
    }
    return movieData;
}