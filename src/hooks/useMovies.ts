import { useQuery } from '@tanstack/react-query';
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchNowPlaying,
  fetchUpcoming,
  fetchMovieDetail,
  fetchMovieCredits,
  fetchMovieVideos,
  fetchSimilarMovies,
  fetchGenres,
  searchMovies,
  discoverMovies,
} from '../api/tmdb';

export const useTrending = (page = 1) =>
  useQuery({
    queryKey: ['trending', page],
    queryFn: () => fetchTrending(page),
    staleTime: 1000 * 60 * 5,
  });

export const usePopular = (page = 1) =>
  useQuery({
    queryKey: ['popular', page],
    queryFn: () => fetchPopular(page),
    staleTime: 1000 * 60 * 5,
  });

export const useTopRated = (page = 1) =>
  useQuery({
    queryKey: ['topRated', page],
    queryFn: () => fetchTopRated(page),
    staleTime: 1000 * 60 * 10,
  });

export const useNowPlaying = (page = 1) =>
  useQuery({
    queryKey: ['nowPlaying', page],
    queryFn: () => fetchNowPlaying(page),
    staleTime: 1000 * 60 * 5,
  });

export const useUpcoming = (page = 1) =>
  useQuery({
    queryKey: ['upcoming', page],
    queryFn: () => fetchUpcoming(page),
    staleTime: 1000 * 60 * 10,
  });

export const useMovieDetail = (id: number) =>
  useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => fetchMovieDetail(id),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });

export const useMovieCredits = (id: number) =>
  useQuery({
    queryKey: ['movieCredits', id],
    queryFn: () => fetchMovieCredits(id),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });

export const useMovieVideos = (id: number) =>
  useQuery({
    queryKey: ['movieVideos', id],
    queryFn: () => fetchMovieVideos(id),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });

export const useSimilarMovies = (id: number) =>
  useQuery({
    queryKey: ['similarMovies', id],
    queryFn: () => fetchSimilarMovies(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

export const useGenres = () =>
  useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 60,
  });

export const useSearchMovies = (
  query: string,
  page = 1,
  genreId?: number,
  year?: number
) =>
  useQuery({
    queryKey: ['search', query, page, genreId, year],
    queryFn: () => searchMovies(query, page, genreId, year),
    staleTime: 1000 * 60 * 2,
    enabled: query.length > 0,
  });

export const useDiscoverMovies = (
  page = 1,
  genreId?: number,
  year?: number,
  sortBy?: string
) =>
  useQuery({
    queryKey: ['discover', page, genreId, year, sortBy],
    queryFn: () => discoverMovies(page, genreId, year, sortBy),
    staleTime: 1000 * 60 * 5,
  });
