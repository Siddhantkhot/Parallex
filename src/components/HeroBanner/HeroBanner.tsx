import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getBackdropUrl } from '../../api/tmdb';
import type { Movie } from '../../types/tmdb.types';
import './HeroBanner.css';

interface HeroBannerProps {
  movies?: Movie[];
  isLoading?: boolean;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ movies, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = movies?.slice(0, 6) ?? [];

  useEffect(() => {
    if (featured.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featured.length]);

  const goTo = (idx: number) => setCurrentIndex(idx);
  const prev = () => setCurrentIndex((i) => (i - 1 + featured.length) % featured.length);
  const next = () => setCurrentIndex((i) => (i + 1) % featured.length);

  if (isLoading) {
    return (
      <div className="hero hero--loading" aria-hidden="true">
        <div className="hero__skeleton skeleton-shimmer" />
      </div>
    );
  }

  if (featured.length === 0) return null;

  const movie = featured[currentIndex];
  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const rating = movie.vote_average.toFixed(1);

  return (
    <section className="hero" aria-label="Featured movie">
      {/* Background images */}
      {featured.map((m, i) => {
        const bg = getBackdropUrl(m.backdrop_path);
        return (
          <div
            key={m.id}
            className={`hero__bg ${i === currentIndex ? 'active' : ''}`}
            style={bg ? { backgroundImage: `url(${bg})` } : {}}
            aria-hidden="true"
          />
        );
      })}

      {/* Gradient overlays */}
      <div className="hero__gradient" aria-hidden="true" />
      <div className="hero__gradient-bottom" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content container animate-fade-in-up" key={movie.id}>
        <div className="hero__meta">
          <span className="badge badge-gold">
            <Star size={10} fill="currentColor" /> {rating}
          </span>
          {year && <span className="hero__year">{year}</span>}
        </div>

        <h1 className="hero__title">{movie.title}</h1>

        <p className="hero__overview">
          {movie.overview.length > 200
            ? movie.overview.slice(0, 197) + '...'
            : movie.overview}
        </p>

        <div className="hero__actions">
          <Link to={`/movie/${movie.id}`} id={`hero-details-btn-${movie.id}`} className="btn btn-primary">
            <Play size={18} fill="currentColor" /> Watch Now
          </Link>
          <Link to={`/movie/${movie.id}`} id={`hero-info-btn-${movie.id}`} className="btn btn-ghost">
            <Info size={18} /> More Info
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        id="hero-prev-btn"
        className="hero__arrow hero__arrow--left"
        onClick={prev}
        aria-label="Previous featured movie"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        id="hero-next-btn"
        className="hero__arrow hero__arrow--right"
        onClick={next}
        aria-label="Next featured movie"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="hero__dots" role="tablist" aria-label="Featured movies navigation">
        {featured.map((m, i) => (
          <button
            key={m.id}
            id={`hero-dot-${i}`}
            role="tab"
            className={`hero__dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${m.title}`}
            aria-selected={i === currentIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
