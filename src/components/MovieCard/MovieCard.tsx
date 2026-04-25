import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus } from 'lucide-react';
import { getPosterUrl } from '../../api/tmdb';
import { useFavorites } from '../../context/FavoritesContext';
import type { Movie } from '../../types/tmdb.types';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  size?: 'sm' | 'md' | 'lg';
  animationDelay?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, size = 'md', animationDelay = 0 }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);
  const posterUrl = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`movie-card movie-card--${size} animate-fade-in-up`}
      style={{ animationDelay: `${animationDelay}ms` }}
      aria-label={`${movie.title} (${year}), rated ${rating}`}
    >
      {/* Poster */}
      <div className="movie-card__poster-wrap">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            className="movie-card__poster"
            loading="lazy"
          />
        ) : (
          <div className="movie-card__poster movie-card__poster--fallback">
            <span>{movie.title.charAt(0)}</span>
          </div>
        )}

        {/* Overlay */}
        <div className="movie-card__overlay" aria-hidden="true">
          <div className="movie-card__overlay-content">
            <Plus size={24} className="movie-card__overlay-icon" />
            <span>View Details</span>
          </div>
        </div>

        {/* Rating badge */}
        <div className="movie-card__rating badge badge-gold" aria-label={`Rating: ${rating}`}>
          <Star size={10} fill="currentColor" />
          {rating}
        </div>

        {/* Favorite Button */}
        <button
          id={`fav-btn-${movie.id}`}
          className={`movie-card__fav-btn ${favorite ? 'active' : ''}`}
          onClick={handleFavorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
        >
          <Heart size={14} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        {year && <span className="movie-card__year">{year}</span>}
      </div>
    </Link>
  );
};

export default MovieCard;
