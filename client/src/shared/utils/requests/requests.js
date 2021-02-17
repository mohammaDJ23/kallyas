import { tmdbGenre } from "../tmdb-genre/tmdb-genre";

export function requests({ id, type, genre, query, page = 1 }) {
  if (genre) {
    genre = Object.keys(tmdbGenre()).find(
      item => tmdbGenre()[item].toLowerCase() === genre.toLowerCase() && item
    );
  }

  return {
    nowPlaying: `${process.env.REACT_APP_TMDB_BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_TOKEN}&language=en-US&region=US`,
    popularTv: `${process.env.REACT_APP_TMDB_BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_TMDB_TOKEN}&page=1`,
    trending: `${process.env.REACT_APP_TMDB_BASE_URL}/trending/all/day?api_key=${process.env.REACT_APP_TMDB_TOKEN}&page=${page}`,

    trailers: [
      `${process.env.REACT_APP_TMDB_BASE_URL}/movie/299534?api_key=${process.env.REACT_APP_TMDB_TOKEN}&append_to_response=videos,images`,
      `${process.env.REACT_APP_TMDB_BASE_URL}/movie/122?api_key=${process.env.REACT_APP_TMDB_TOKEN}&append_to_response=videos`,
      `${process.env.REACT_APP_TMDB_BASE_URL}/movie/155?api_key=${process.env.REACT_APP_TMDB_TOKEN}&append_to_response=videos,images`
    ],

    singleMovieOrTv: `${process.env.REACT_APP_TMDB_BASE_URL}/${type}/${id}?api_key=${process.env.REACT_APP_TMDB_TOKEN}&append_to_response=videos,images`,
    similar: `${process.env.REACT_APP_TMDB_BASE_URL}/${type}/${id}/similar?api_key=${process.env.REACT_APP_TMDB_TOKEN}`,
    topRatedMovieOrTv: `${process.env.REACT_APP_TMDB_BASE_URL}/${type}/top_rated?api_key=${process.env.REACT_APP_TMDB_TOKEN}&page=${page}`,

    getAllByGenre: [
      `${process.env.REACT_APP_TMDB_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_TOKEN}&page=${page}&year=2010&vote_count.gte=6&with_genres=${genre}`,
      `${process.env.REACT_APP_TMDB_BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_TMDB_TOKEN}&page=${page}&year=2010&vote_count.gte=6&with_genres=${genre}`
    ],

    search: `${process.env.REACT_APP_TMDB_BASE_URL}/search/multi?api_key=${process.env.REACT_APP_TMDB_TOKEN}&page=1&query=${query}`
  };
}
