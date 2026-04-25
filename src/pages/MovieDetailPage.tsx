import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Clock,
  Calendar,
  Heart,
  ExternalLink,
  Play,
  ChevronLeft,
  Globe,
} from 'lucide-react';
import { useMovieDetail, useMovieCredits, useMovieVideos, useSimilarMovies } from '../hooks/useMovies';
import { getBackdropUrl, getPosterUrl, getProfileUrl } from '../api/tmdb';
import { useFavorites } from '../context/FavoritesContext';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import { SkeletonDetail } from '../components/SkeletonLoader/SkeletonLoader';
import type { Movie } from '../types/tmdb.types';
import './MovieDetailPage.css';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { data: movie, isLoading, error } = useMovieDetail(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videosData } = useMovieVideos(movieId);
  const { data: similar } = useSimilarMovies(movieId);
  const { isFavorite, toggleFavorite } = useFavorites();

  const [trailerOpen, setTrailerOpen] = useState(false);

  if (isLoading) return <div className="page detail-page"><SkeletonDetail /></div>;
  if (error || !movie) {
    return (
      <main className="page detail-page detail-page--error">
        <div className="container">
          <h1>Movie not found</h1>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go Home</Link>
        </div>
      </main>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const rating = movie.vote_average.toFixed(1);
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
  const favorite = isFavorite(movie.id);

  // Trailer
  const trailer = videosData?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube' && v.official
  ) ?? videosData?.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  // Cast (top 12)
  const cast = credits?.cast.slice(0, 12) ?? [];

  // Director
  const director = credits?.crew.find((c) => c.job === 'Director');

  // Convert MovieDetail to Movie for toggleFavorite (pick required fields)
  const movieAsMovie: Movie = {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    genre_ids: movie.genres.map((g) => g.id),
    adult: movie.adult,
    original_language: movie.original_language,
    popularity: movie.popularity,
  };

  return (
    <main className="page detail-page">
      {/* Backdrop */}
      {backdropUrl && (
        <div
          className="detail-page__backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
          aria-hidden="true"
        >
          <div className="detail-page__backdrop-overlay" />
        </div>
      )}

      {/* Back Button */}
      <div className="detail-page__back container">
        <Link to="/" id="back-to-home-btn" className="btn btn-ghost">
          <ChevronLeft size={18} /> Back
        </Link>
      </div>

      {/* Main Content */}
      <div className="detail-page__main container animate-fade-in-up">
        {/* Poster */}
        <aside className="detail-page__poster-col">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={`${movie.title} poster`}
              className="detail-page__poster"
            />
          ) : (
            <div className="detail-page__poster detail-page__poster--fallback">
              {movie.title.charAt(0)}
            </div>
          )}

          {/* Favorite Button */}
          <button
            id={`detail-fav-btn-${movie.id}`}
            className={`btn detail-page__fav-btn ${favorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(movieAsMovie)}
            aria-pressed={favorite}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
            {favorite ? 'In Favorites' : 'Add to Favorites'}
          </button>

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              id="movie-homepage-link"
              className="btn btn-ghost detail-page__home-link"
            >
              <Globe size={16} /> Official Site <ExternalLink size={12} />
            </a>
          )}
        </aside>

        {/* Info */}
        <div className="detail-page__info">
          {/* Title */}
          <h1 className="detail-page__title">{movie.title}</h1>
          {movie.tagline && (
            <p className="detail-page__tagline">"{movie.tagline}"</p>
          )}

          {/* Meta row */}
          <div className="detail-page__meta">
            <span className="badge badge-gold">
              <Star size={12} fill="currentColor" /> {rating}
            </span>
            {year && (
              <span className="detail-page__meta-item">
                <Calendar size={14} /> {year}
              </span>
            )}
            {runtime && (
              <span className="detail-page__meta-item">
                <Clock size={14} /> {runtime}
              </span>
            )}
            <span className="detail-page__meta-item detail-page__status">{movie.status}</span>
          </div>

          {/* Genres */}
          {movie.genres.length > 0 && (
            <div className="detail-page__genres">
              {movie.genres.map((g) => (
                <Link
                  key={g.id}
                  to={`/search?genre=${g.id}`}
                  className="genre-pill"
                  id={`genre-link-${g.id}`}
                >
                  {g.name}
                </Link>
              ))}
            </div>
          )}

          {/* Overview */}
          <div className="detail-page__section">
            <h2 className="detail-page__section-title">Overview</h2>
            <p className="detail-page__overview">{movie.overview || 'No overview available.'}</p>
          </div>

          {/* Director */}
          {director && (
            <div className="detail-page__director">
              <span className="detail-page__director-label">Director</span>
              <span className="detail-page__director-name">{director.name}</span>
            </div>
          )}

          {/* Trailer Button */}
          {trailer && (
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <button
                id="watch-trailer-btn"
                className="btn btn-primary"
                onClick={() => setTrailerOpen(true)}
              >
                <Play size={18} fill="currentColor" /> Watch Trailer
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="detail-page__stats">
            <div className="detail-page__stat">
              <span className="detail-page__stat-label">Vote Count</span>
              <span className="detail-page__stat-value">{movie.vote_count.toLocaleString()}</span>
            </div>
            {movie.budget > 0 && (
              <div className="detail-page__stat">
                <span className="detail-page__stat-label">Budget</span>
                <span className="detail-page__stat-value">${(movie.budget / 1e6).toFixed(0)}M</span>
              </div>
            )}
            {movie.revenue > 0 && (
              <div className="detail-page__stat">
                <span className="detail-page__stat-label">Revenue</span>
                <span className="detail-page__stat-value">${(movie.revenue / 1e6).toFixed(0)}M</span>
              </div>
            )}
            {movie.original_language && (
              <div className="detail-page__stat">
                <span className="detail-page__stat-label">Language</span>
                <span className="detail-page__stat-value">{movie.original_language.toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cast */}
      {cast.length > 0 && (
        <section className="detail-page__cast container" aria-label="Cast">
          <h2 className="detail-page__section-title">Cast</h2>
          <div className="detail-page__cast-grid">
            {cast.map((member) => (
              <div key={member.id} className="cast-card animate-scale-in">
                <div className="cast-card__photo">
                  {getProfileUrl(member.profile_path) ? (
                    <img
                      src={getProfileUrl(member.profile_path)!}
                      alt={member.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="cast-card__photo-fallback">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="cast-card__info">
                  <span className="cast-card__name">{member.name}</span>
                  <span className="cast-card__character">{member.character}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Similar Movies */}
      {similar?.results && similar.results.length > 0 && (
        <div style={{ marginTop: 'var(--space-2xl)' }}>
          <MovieCarousel
            title="You May Also Like"
            movies={similar.results}
          />
        </div>
      )}

      {/* Trailer Modal */}
      {trailerOpen && trailer && (
        <div
          className="trailer-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Movie trailer"
          onClick={(e) => { if (e.target === e.currentTarget) setTrailerOpen(false); }}
        >
          <div className="trailer-modal__content animate-scale-in">
            <button
              id="close-trailer-btn"
              className="trailer-modal__close btn btn-ghost"
              onClick={() => setTrailerOpen(false)}
              aria-label="Close trailer"
            >
              ✕ Close
            </button>
            <div className="trailer-modal__iframe-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                title={`${movie.title} Trailer`}
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieDetailPage;
