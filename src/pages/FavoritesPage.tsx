import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Star, Calendar } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { getPosterUrl } from '../api/tmdb';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite, toggleFavorite } = useFavorites();

  return (
    <main className="page favorites-page">
      <div className="container">
        {/* Header */}
        <div className="favorites-page__header animate-fade-in-up">
          <div className="favorites-page__heading-row">
            <Heart size={28} className="favorites-page__icon" fill="currentColor" />
            <h1 className="favorites-page__heading">My Favorites</h1>
          </div>
          <p className="favorites-page__sub">
            {favorites.length > 0
              ? `${favorites.length} movie${favorites.length > 1 ? 's' : ''} saved`
              : 'Your favorites list is empty'}
          </p>
        </div>

        {/* Empty State */}
        {favorites.length === 0 && (
          <div className="favorites-page__empty animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="favorites-page__empty-icon" aria-hidden="true">🎬</div>
            <h2 className="favorites-page__empty-title">No favorites yet</h2>
            <p className="favorites-page__empty-sub">
              Start exploring movies and add them to your favorites list.
            </p>
            <Link to="/search" id="discover-movies-btn" className="btn btn-primary" style={{ marginTop: 'var(--space-xl)' }}>
              Discover Movies
            </Link>
          </div>
        )}

        {/* Favorites Grid */}
        {favorites.length > 0 && (
          <div className="favorites-page__grid">
            {favorites.map((movie, i) => {
              const posterUrl = getPosterUrl(movie.poster_path);
              const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
              const rating = movie.vote_average.toFixed(1);

              return (
                <div
                  key={movie.id}
                  className="fav-card animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link to={`/movie/${movie.id}`} className="fav-card__link" aria-label={`View ${movie.title}`}>
                    <div className="fav-card__poster-wrap">
                      {posterUrl ? (
                        <img src={posterUrl} alt={`${movie.title} poster`} className="fav-card__poster" loading="lazy" />
                      ) : (
                        <div className="fav-card__poster fav-card__poster--fallback">
                          {movie.title.charAt(0)}
                        </div>
                      )}
                      <div className="fav-card__overlay" aria-hidden="true">View</div>
                    </div>
                  </Link>

                  <div className="fav-card__info">
                    <div className="fav-card__info-main">
                      <Link to={`/movie/${movie.id}`} className="fav-card__title">{movie.title}</Link>
                      <div className="fav-card__meta">
                        <span className="badge badge-gold">
                          <Star size={10} fill="currentColor" /> {rating}
                        </span>
                        {year && (
                          <span className="fav-card__year">
                            <Calendar size={12} /> {year}
                          </span>
                        )}
                      </div>
                      <p className="fav-card__overview">
                        {movie.overview.length > 120
                          ? movie.overview.slice(0, 117) + '...'
                          : movie.overview}
                      </p>
                    </div>

                    <button
                      id={`remove-fav-btn-${movie.id}`}
                      className="fav-card__remove btn btn-ghost"
                      onClick={() => removeFavorite(movie.id)}
                      aria-label={`Remove ${movie.title} from favorites`}
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritesPage;
