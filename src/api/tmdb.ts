import axios from 'axios';
import type {
  MovieListResponse,
  MovieDetail,
  Credits,
  VideosResponse,
  GenresResponse,
} from '../types/tmdb.types';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const POSTER_SIZES = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original',
};
export const BACKDROP_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
  original: 'original',
};

export const getPosterUrl = (path: string | null, size = POSTER_SIZES.medium) =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const getBackdropUrl = (path: string | null, size = BACKDROP_SIZES.large) =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const getProfileUrl = (path: string | null, size = 'w185') =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// ─── Movie Lists ────────────────────────────────────────────────────────────

export const fetchTrending = async (page = 1): Promise<MovieListResponse> => {
  const { data } = await tmdb.get('/trending/movie/week', { params: { page } });
  return data;
};

export const fetchPopular = async (page = 1): Promise<MovieListResponse> => {
  const { data } = await tmdb.get('/movie/popular', { params: { page } });
  return data;
};

export const fetchTopRated = async (page = 1): Promise<MovieListResponse> => {
  const { data } = await tmdb.get('/movie/top_rated', { params: { page } });
  return data;
};

export const fetchNowPlaying = async (page = 1): Promise<MovieListResponse> => {
  const { data } = await tmdb.get('/movie/now_playing', { params: { page } });
  return data;
};

export const fetchUpcoming = async (page = 1): Promise<MovieListResponse> => {
  const { data } = await tmdb.get('/movie/upcoming', { params: { page } });
  return data;
};

// ─── Search ─────────────────────────────────────────────────────────────────

export const searchMovies = async (
  query: string,
  page = 1,
  genreId?: number,
  year?: number
): Promise<MovieListResponse> => {
  const { data } = await tmdb.get('/search/movie', {
    params: {
      query,
      page,
      ...(year && { year }),
    },
  });
  // Client-side genre filter since search endpoint doesn't support it
  if (genreId) {
    data.results = data.results.filter((m: { genre_ids: number[] }) =>
      m.genre_ids.includes(genreId)
    );
  }
  return data;
};

export const discoverMovies = async (
  page = 1,
  genreId?: number,
  year?: number,
  sortBy = 'popularity.desc'
): Promise<MovieListResponse> => {
  const { data } = await tmdb.get('/discover/movie', {
    params: {
      page,
      sort_by: sortBy,
      ...(genreId && { with_genres: genreId }),
      ...(year && { primary_release_year: year }),
    },
  });
  return data;
};

// ─── Movie Detail ────────────────────────────────────────────────────────────

export const fetchMovieDetail = async (id: number): Promise<MovieDetail> => {
  const { data } = await tmdb.get(`/movie/${id}`);
  return data;
};

export const fetchMovieCredits = async (id: number): Promise<Credits> => {
  const { data } = await tmdb.get(`/movie/${id}/credits`);
  return data;
};

export const fetchMovieVideos = async (id: number): Promise<VideosResponse> => {
  const { data } = await tmdb.get(`/movie/${id}/videos`);
  return data;
};

export const fetchSimilarMovies = async (id: number): Promise<MovieListResponse> => {
  const { data } = await tmdb.get(`/movie/${id}/similar`);
  return data;
};

// ─── Genres ──────────────────────────────────────────────────────────────────

export const fetchGenres = async (): Promise<GenresResponse> => {
  const { data } = await tmdb.get('/genre/movie/list');
  return data;
};
